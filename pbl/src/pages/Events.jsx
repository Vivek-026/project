import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import EditEventForm from "../components/events/EditEventForm"; // ✅ Import Edit Form

const Events = () => {
  const { user } = useAuth();
  const { events, loading, error } = useFetchEvents();
  const navigate = useNavigate();

  const [editingEvent, setEditingEvent] = useState(null); // 🔹 Track Editing Event

  // 🗑️ Handle Delete Event
 // 🗑️ Handle Delete Event
const handleDelete = async (eventId) => {
   const confirmDelete = window.confirm("Are you sure you want to delete this event?");
   if (!confirmDelete) return;
 
   try {
     const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${user.token}`, // ✅ Ensure the token is valid
       },
     });
 
     if (!response.ok) {
       throw new Error("Failed to delete event");
     }
 
     alert("Event deleted successfully!");
     window.location.reload();
   } catch (error) {
     console.error("Error deleting event:", error);
     alert("Error deleting event!");
   }
 };
 
  // ✏️ Open Edit Form Modal
  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  // 🔄 Update UI After Editing
  const handleUpdateSuccess = (updatedEvent) => {
    setEditingEvent(null); // Close modal
    window.location.reload(); // ✅ Refresh events (or update state dynamically)
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      
      {/* 🔥 Page Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-purple-800 flex items-center justify-center gap-4">
          <CalendarDays className="text-purple-600" size={40} />
          Upcoming Events
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Stay updated with the latest events happening in our community!
        </p>
      </div>

      {/* 🔹 Show Create Event Button for Club Admins */}
      {user?.role === "club-admin" && (
        <button 
          onClick={() => navigate("/create-event")} 
          className="bg-purple-600 text-white px-4 py-2 rounded-lg mb-4"
        >
          Create New Event
        </button>
      )}

      {/* 📝 Event List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {loading && <p className="text-center text-gray-600">Loading events...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {events.length > 0 ? (
          events.map((event) => (
            <Card key={event._id} className="shadow-lg rounded-lg overflow-hidden border">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-52 object-cover"
                onError={(e) => { e.target.src = "/assets/placeholder.png"; }}
              />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold text-center mb-2">🎉 {event.title}</h2>
                <p className="text-gray-700"><strong>📍 Location:</strong> {event.location || "Not specified"}</p>
                <p className="text-gray-700"><strong>🕒 Time:</strong> {new Date(event.date).toDateString()} at {event.time}</p>
                <p className="text-gray-700"><strong>📝 Description:</strong> {event.description}</p>

                {/* 🛠 Show Edit & Delete Buttons for Club Admin or Organizer */}
                {(user?.role === "club-admin" || user?.id === event.organizer) && (
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
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          !loading && <p className="text-center">No upcoming events.</p>
        )}
      </div>

      {/* 📝 Edit Form Modal (Conditionally Rendered) */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button onClick={() => setEditingEvent(null)} className="absolute top-2 right-2 text-xl">✖</button>
            <EditEventForm event={editingEvent} onUpdateSuccess={handleUpdateSuccess} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
