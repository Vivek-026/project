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
      setPreview(URL.createObjectURL(file)); // Show image preview
    }
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   setError("");
 
   const token = localStorage.getItem("token");
   console.log("Token:", token); // Debugging
 
   if (!token) {
     setError("⚠️ Authentication token is missing. Please login again.");
     setLoading(false);
     return;
   }
 
   const formData = new FormData();
   Object.keys(form).forEach((key) => formData.append(key, form[key]));
   if (image) formData.append("image", image);
 
   try {
     await createEvent(formData, token);  // Ensure token is passed correctly
     alert("🎉 Event created successfully!");
 
     setForm({ title: "", description: "", date: "", time: "", location: "" });
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
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a New Event</h2>

      {error && <p className="text-red-500 text-center mb-2">{error}</p>}

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Event Title"
        required
        className="block w-full p-2 mb-3 border rounded-md"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Event Description"
        required
        className="block w-full p-2 mb-3 border rounded-md"
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
        className="block w-full p-2 mb-3 border rounded-md"
      />
      <input
        type="time"
        name="time"
        value={form.time}
        onChange={handleChange}
        required
        className="block w-full p-2 mb-3 border rounded-md"
      />
      <input
        type="text"
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        required
        className="block w-full p-2 mb-3 border rounded-md"
      />

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="border rounded-md p-2 w-full mb-3"
      />

      {/* Image Preview */}
      {preview && (
        <img
          src={preview}
          alt="Event Preview"
          className="w-full h-40 object-cover rounded-lg mb-3 border"
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full px-4 py-2 text-white rounded-lg ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {loading ? "Creating Event..." : "Create Event"}
      </button>
    </form>
  );
};

export default CreateEvent;
