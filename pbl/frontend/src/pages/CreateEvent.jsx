import React, { useState } from "react";
import { createEvent } from "../api/eventApi";
import { useAuth } from "../context/AuthContext";

const CreateEvent = () => {
  const { token } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    registrationLimit: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("⚠️ Authentication token is missing. Please login again.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (image) formData.append("image", image);

    try {
      await createEvent(formData, token);
      alert("🎉 Event created successfully!");

      setForm({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        registrationLimit: "",
      });
      setImage(null);
      setPreview(null);
    } catch (error) {
      setError(error.response?.data?.message || "⚠️ Error creating event. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 md:ml-72 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8">
            <h2 className="text-3xl font-bold text-white text-center">Create New Event</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 
                    focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    transition-all duration-200 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Enter event location"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 
                    focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    transition-all duration-200 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 
                    focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    transition-all duration-200 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 
                    focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    transition-all duration-200 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your event..."
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 
                  focus:ring-2 focus:ring-purple-500 focus:border-transparent
                  transition-all duration-200 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Limit
              </label>
              <input
                type="number"
                name="registrationLimit"
                value={form.registrationLimit}
                onChange={handleChange}
                placeholder="Maximum number of participants"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 
                  focus:ring-2 focus:ring-purple-500 focus:border-transparent
                  transition-all duration-200 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Banner
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-3 rounded-xl border border-gray-200
                  file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                  file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700
                  hover:file:bg-purple-100 transition-all duration-200"
              />
            </div>

            {preview && (
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={preview}
                  alt="Event banner preview"
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-4 rounded-xl text-white font-semibold text-lg
                transition-all duration-300 transform hover:scale-[1.02]
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                }`}
            >
              {loading ? 'Creating Event...' : 'Create Event'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;