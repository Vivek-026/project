// import React, { useEffect, useState } from "react";
// import { useFetchEvents } from "../hooks/useFetchEvents";
// import { useAuth } from "../context/AuthContext";
// import { Card, CardContent } from "../components/ui/Card";
// import axiosInstance from "../api/axiosInstance";
// import Button from "../components/ui/Button";
// import EventForm from "../components/events/EventForm";

// const MyEvents = () => {
//   const { user, token } = useAuth();
//   const { events, loading, error, refreshEvents } = useFetchEvents(); // ✅ Added refreshEvents for reloading after update/delete
//   const myEvents = events.filter(event => event.organizer === user?.id);

//   const [editEvent, setEditEvent] = useState(null); // ✅ Store event being edited

//   // ✅ Handle Delete Event
//   const handleDelete = async (eventId) => {
//     if (!window.confirm("Are you sure you want to delete this event?")) return;

//     try {
//       await axiosInstance.delete(`/events/${eventId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Event deleted successfully!");
//       refreshEvents(); // ✅ Refresh events list
//     } catch (err) {
//       console.error("Error deleting event:", err.response?.data);
//     }
//   };

//   // ✅ Handle Update Event
//   const handleUpdate = async (updatedData) => {
//     try {
//       await axiosInstance.put(`/events/${editEvent._id}`, updatedData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Event updated successfully!");
//       setEditEvent(null); // ✅ Close edit form
//       refreshEvents(); // ✅ Refresh events list
//     } catch (err) {
//       console.error("Error updating event:", err.response?.data);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">My Events</h1>
//       {loading && <p>Loading events...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {myEvents.length === 0 ? (
//         <p>No events created yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {myEvents.map((event) => (
//             <Card key={event._id} className="p-4">
//               <CardContent>
//                 <h2 className="text-lg font-semibold">{event.title}</h2>
//                 <p>{event.description}</p>
//                 <p className="text-sm text-gray-500">{event.date}</p>
                
//                 {/* ✅ Edit & Delete Buttons */}
//                 <div className="mt-3 flex gap-2">
//                   <Button onClick={() => setEditEvent(event)}>Edit</Button>
//                   <Button onClick={() => handleDelete(event._id)} className="bg-red-500">
//                     Delete
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* ✅ Show Event Edit Form (Modal or Inline) */}
//       {editEvent && (
//         <EventForm
//           event={editEvent}
//           onSubmit={handleUpdate}
//           onCancel={() => setEditEvent(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default MyEvents;


import React, { useEffect, useState } from "react";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import axiosInstance from "../api/axiosInstance";

const MyEvents = () => {
  const { user } = useAuth();
  const { events, loading, error } = useFetchEvents();
  const myEvents = events.filter(event => event.createdBy === user?.id);

  // Function to delete event
  const handleDelete = async (eventId) => {
    try {
      await axiosInstance.delete(`/events/${eventId}`);
      alert("Event deleted successfully");
      window.location.reload(); // Reload page to update event list
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Events</h1>
      {loading && <p>Loading events...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {myEvents.length === 0 ? (
        <p>No events created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myEvents.map((event) => (
            <Card key={event._id} className="p-4">
              <CardContent>
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <p>{event.description}</p>
                <p className="text-sm text-gray-500">{event.date}</p>

                {/* Buttons for update & delete */}
                <div className="mt-4 flex gap-2">
                  <Button onClick={() => handleDelete(event._id)} className="bg-red-600">
                    Delete
                  </Button>
                  <Button onClick={() => alert("Update functionality coming soon")} className="bg-yellow-500">
                    Update
                  </Button>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
