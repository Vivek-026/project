import React, { useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import { CalendarPlus, Loader2 } from "lucide-react";

const EventForm = ({ onEventCreated }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    registrationLimit: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }

      const res = await axiosInstance.post("/api/events", data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onEventCreated?.(res.data.event);
      setFormData({
        name: "",
        description: "",
        date: "",
        time: "",
        duration: "",
        location: "",
        registrationLimit: "",
        image: null,
      });
    } catch (err) {
      console.error("Create Event Error:", err);
      setError(err.response?.data?.message || "Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <CalendarPlus className="text-purple-600" />
        Create a New Event
      </h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Event Name" value={formData.name} onChange={handleChange} required className="input w-full" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="input w-full" />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="input w-full" />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required className="input w-full" />
        <input name="duration" placeholder="Duration (e.g., 2 hours)" value={formData.duration} onChange={handleChange} required className="input w-full" />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="input w-full" />
        <input type="number" name="registrationLimit" placeholder="Registration Limit" value={formData.registrationLimit} onChange={handleChange} required className="input w-full" />
        <input type="file" name="image" accept="image/*" onChange={handleChange} className="input w-full" />
        <button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md w-full flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
