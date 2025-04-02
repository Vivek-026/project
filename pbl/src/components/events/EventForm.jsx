import React, { useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import { CalendarPlus, Loader2 } from "lucide-react";

const EventForm = ({ onEventCreated }) => {
  const { user } = useAuth();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.post("/events", eventData, {
        headers: { Authorization: `Bearer ${user?.token}` }, // Ensure the token is sent
      });
      
      onEventCreated(res.data.event); // Update the UI
      setEventData({ title: "", description: "", date: "", time: "", location: "", image: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Error creating event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <CalendarPlus size={24} className="text-purple-600" />
        Create a New Event
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="title" placeholder="Event Title" value={eventData.title} onChange={handleChange} required className="border p-2 w-full"/>
        <textarea name="description" placeholder="Description" value={eventData.description} onChange={handleChange} required className="border p-2 w-full"></textarea>
        <input type="date" name="date" value={eventData.date} onChange={handleChange} required className="border p-2 w-full"/>
        <input type="time" name="time" value={eventData.time} onChange={handleChange} required className="border p-2 w-full"/>
        <input type="text" name="location" placeholder="Location" value={eventData.location} onChange={handleChange} required className="border p-2 w-full"/>
        <input type="text" name="image" placeholder="Image URL" value={eventData.image} onChange={handleChange} className="border p-2 w-full"/>
        
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
