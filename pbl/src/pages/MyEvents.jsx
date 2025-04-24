import React, { useState, useEffect } from "react";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import axiosInstance from "../api/axiosInstance";
import EditEventForm from "../components/events/EditEventForm";

const MyEvents = () => {
  const { user } = useAuth();
  const { events, loading, error } = useFetchEvents();
  const [editEvent, setEditEvent] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // trigger data re-fetch when refresh flag changes
  }, [refresh]);

  const myEvents = events.filter((event) => event.createdBy === user?.id);

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axiosInstance.delete(`/events/${eventId}`);
      alert("Event deleted successfully");
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  };

  const handleUpdateEvent = async (eventId, updatedData) => {
    try {
      const res = await axiosInstance.put(`/events/${eventId}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Event updated:", res.data);
      alert("Event updated successfully");
      setEditEvent(null);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error("Error updating event:", err);
      alert("Failed to update event");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Events</h1>
      {loading && <p>Loading events...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {editEvent && (
        <EditEventForm event={editEvent} onUpdate={handleUpdateEvent} onCancel={() => setEditEvent(null)} />
      )}

      {myEvents.length === 0 ? (
        <p>No events created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myEvents.map((event) => (
            <Card key={event._id} className="p-4">
              <CardContent>
                <h2 className="text-lg font-semibold">{event.name}</h2>
                <p>{event.description}</p>
                <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
                <p className="text-sm text-gray-500">Location: {event.location}</p>
                <p className="text-sm text-gray-500">Limit: {event.registrationLimit}</p>

                <div className="mt-4 flex gap-2">
                  <Button onClick={() => handleDelete(event._id)} className="bg-red-600">
                    Delete
                  </Button>
                  <Button onClick={() => setEditEvent(event)} className="bg-yellow-500">
                    Edit
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
