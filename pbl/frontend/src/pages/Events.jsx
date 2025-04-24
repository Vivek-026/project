import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { CalendarDays, X, MapPin, Clock, Users as UsersIcon, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import EditEventForm from "../components/events/EditEventForm";
import axiosInstance from "../api/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";

const Events = () => {
  const { user } = useAuth();
  const { events, loading, error } = useFetchEvents();
  const navigate = useNavigate();

  const [editingEvent, setEditingEvent] = useState(null);
  const [registerEvent, setRegisterEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    department: "",
    division: "",
    rollNumber: "",
  });

  const departments = [
    "Computer Engineering",
    "ENTC Engineering",
    "IT Engineering",
    "ECE Engineering",
    "AIDS Engineering",
  ];

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axiosInstance.delete(`/events/${eventId}`);
      alert("Event deleted successfully!");
      window.location.reload();
    } catch (err) {
      alert("Failed to delete event.");
    }
  };

  const handleEdit = (event) => setEditingEvent(event);
  const handleRegisterClick = (event) => {
    setRegisterEvent(event);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      department: "",
      division: "",
      rollNumber: "",
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/events/${registerEvent._id}/register`, formData);
      alert("Registered successfully!");
      setRegisterEvent(null);
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.message || "Try again"));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 md:ml-64 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
          <p className="text-gray-600 text-xl font-medium">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 md:ml-64">
      <div className="max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-purple-800 flex items-center justify-center gap-6 mb-6">
            <CalendarDays className="text-purple-600" size={56} />
            Upcoming Events
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest events happening in our community!
          </p>
        </motion.div>

        {/* Club Admin: Create Event Button */}
        {user?.role === "club-admin" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-12"
          >
            <button
              onClick={() => navigate("/create-event")}
              className="bg-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold
                shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200
                flex items-center gap-3"
            >
              <CalendarDays size={24} />
              Create New Event
            </button>
          </motion.div>
        )}

        {/* Event List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full bg-red-50 rounded-xl p-6 text-center text-red-600"
              >
                {error}
              </motion.div>
            )}

            {events.length > 0 ? (
              events.map((event) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-200">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.src = "/assets/placeholder.png";
                      }}
                    />
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">
                        {event.title}
                      </h2>
                      
                      <div className="space-y-3 mb-6">
                        <p className="flex items-center gap-3 text-gray-700">
                          <MapPin className="text-purple-500" size={20} />
                          {event.location}
                        </p>
                        <p className="flex items-center gap-3 text-gray-700">
                          <Clock className="text-purple-500" size={20} />
                          {new Date(event.date).toDateString()} at {event.time}
                        </p>
                        <p className="flex items-center gap-3 text-gray-700">
                          <FileText className="text-purple-500" size={20} />
                          {event.description}
                        </p>
                        <p className="flex items-center gap-3 text-gray-700">
                          <UsersIcon className="text-purple-500" size={20} />
                          Limit: {event.registrationLimit} participants
                        </p>
                      </div>

                      {/* Action Buttons */}
                      {(user?.role === "club-admin" || user?.id === event.organizer) ? (
                        <div className="flex gap-4 mt-6">
                          <button
                            onClick={() => handleEdit(event)}
                            className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg
                              hover:bg-purple-700 transition-colors duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event._id)}
                            className="flex-1 bg-red-500 text-white py-3 px-6 rounded-lg
                              hover:bg-red-600 transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRegisterClick(event)}
                          className="w-full bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold
                            hover:bg-purple-700 transform hover:scale-105 transition-all duration-200"
                        >
                          Register Now
                        </button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full bg-white rounded-xl shadow-lg p-16 text-center"
              >
                <CalendarDays size={72} className="text-purple-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  No upcoming events
                </h3>
                <p className="text-gray-600 text-lg">
                  Check back later for new events!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Edit Form Modal */}
        <AnimatePresence>
          {editingEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl p-8 relative w-full max-w-lg m-4"
              >
                <button
                  onClick={() => setEditingEvent(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
                <EditEventForm event={editingEvent} onUpdateSuccess={() => window.location.reload()} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Registration Modal */}
        <AnimatePresence>
          {registerEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl p-8 relative w-full max-w-md m-4"
              >
                <button
                  onClick={() => setRegisterEvent(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-purple-800 mb-6">
                  Register for {registerEvent.title}
                </h2>
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    disabled
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
                  />
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="division"
                    value={formData.division}
                    onChange={handleChange}
                    placeholder="Division"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3"
                  />
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    placeholder="Roll Number"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3"
                  />
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold
                      hover:bg-purple-700 transform hover:scale-105 transition-all duration-200"
                  >
                    Submit Registration
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Events;