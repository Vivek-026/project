import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import EditEventForm from "../components/events/EditEventForm";
import axiosInstance from "../api/axiosInstance";

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

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-purple-800 flex items-center justify-center gap-4">
          <CalendarDays className="text-purple-600" size={40} />
          Upcoming Events
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Stay updated with the latest events happening in our community!
        </p>
      </div>

      {/* Club Admin: Create Event */}
      {user?.role === "club-admin" && (
        <button
          onClick={() => navigate("/create-event")}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg mb-4"
        >
          Create New Event
        </button>
      )}

      {/* Event List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {loading && <p>Loading events...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {events.length > 0 ? (
          events.map((event) => (
            <Card key={event._id} className="shadow-lg rounded-lg overflow-hidden border">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-52 object-cover"
                onError={(e) => {
                  e.target.src = "/assets/placeholder.png";
                }}
              />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold text-center mb-2">
                  🎉 {event.title}
                </h2>
                <p className="text-gray-700">
                  <strong>📍 Location:</strong> {event.location}
                </p>
                <p className="text-gray-700">
                  <strong>🕒 Time:</strong>{" "}
                  {new Date(event.date).toDateString()} at {event.time}
                </p>
                <p className="text-gray-700">
                  <strong>📝 Description:</strong> {event.description}
                </p>
                <p className="text-gray-700">
                  <strong>👥 Registration Limit:</strong> {event.registrationLimit}
                </p>

                {/* Buttons */}
                {(user?.role === "club-admin" || user?.id === event.organizer) ? (
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRegisterClick(event)}
                    className="bg-green-600 text-white w-full mt-4 py-2 rounded hover:bg-green-700"
                  >
                    Register
                  </button>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          !loading && <p>No upcoming events.</p>
        )}
      </div>

      {/* Edit Form Modal */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg">
            <button onClick={() => setEditingEvent(null)} className="absolute top-2 right-3 text-xl">✖</button>
            <EditEventForm event={editingEvent} onUpdateSuccess={() => window.location.reload()} />
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {registerEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button onClick={() => setRegisterEvent(null)} className="absolute top-2 right-3 text-xl">✖</button>
            <h2 className="text-xl font-bold mb-4">Register for {registerEvent.title}</h2>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <input type="text" name="name" value={formData.name} disabled className="w-full border rounded px-3 py-2 bg-gray-100" />
              <input type="email" name="email" value={formData.email} disabled className="w-full border rounded px-3 py-2 bg-gray-100" />
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
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
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="Roll Number"
                required
                className="w-full border rounded px-3 py-2"
              />
              <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                Submit Registration
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
