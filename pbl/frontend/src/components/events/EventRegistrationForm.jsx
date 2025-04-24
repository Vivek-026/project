import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const departments = [
  "Computer Engineering",
  "ENTC Engineering",
  "IT Engineering",
  "ECE Engineering",
  "AIDS Engineering",
];

const EventRegisterForm = ({ eventId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    division: "",
    rollNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post(`/events/${eventId}/register`, formData);
      alert("Successfully registered for event!");
      onSuccess();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">✖</button>
        <h2 className="text-xl font-semibold mb-4 text-purple-700">Register for Event</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          <input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          
          <select name="department" value={formData.department} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
          <input name="division" type="text" placeholder="Division" value={formData.division} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          <input name="rollNumber" type="text" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="bg-purple-600 text-white w-full py-2 rounded">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventRegisterForm;
