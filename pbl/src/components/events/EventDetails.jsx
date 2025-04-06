import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axiosInstance.get(`/api/events/${eventId}`);
        const eventData = res.data;
        console.log("Fetched event data:", eventData);
        setEvent(eventData);

        // Check if user is registered
        if (user && eventData.registrations) {
          const registeredIds = eventData.registrations.map((reg) =>
            typeof reg === "string" ? reg : reg._id
          );
          console.log("Registered IDs:", registeredIds);
          console.log("User ID:", user.id);

          if (registeredIds.includes(user.id)) {
            setIsRegistered(true);
          }
        }
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };

    fetchEvent();
  }, [eventId, user]);

  const handleRegister = async () => {
    try {
      const res = await axiosInstance.post(`/api/events/${eventId}/register`);
      console.log("Registered successfully:", res.data);
      alert("Registered successfully!");
      setIsRegistered(true); // update state to hide the button
    } catch (err) {
      console.error("Error registering for event:", err);
      alert("Registration failed. Try again.");
    }
  };

  if (!event) return <div>Loading event details...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-gray-600">Organized by: {event.club?.name || "Unknown"}</p>
      <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600">Time: {event.time}</p>
      <p className="text-gray-600">Duration: {event.duration} hours</p>
      <p className="text-gray-600">Venue: {event.venue}</p>
      <p className="text-gray-600">Registered: {event.registrations.length} / {event.registrationLimit}</p>

      {/* 👇 Button visible only if user is logged in and not already registered */}
      {user ? (
        !isRegistered ? (
          <button
            onClick={handleRegister}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Register
          </button>
        ) : (
          <p className="mt-4 text-green-600 font-semibold">You are already registered for this event.</p>
        )
      ) : (
        <p className="mt-4 text-red-600">Please login to register.</p>
      )}
    </div>
  );
};

export default EventDetails;
