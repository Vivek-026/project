import React, { useState } from "react";

const EditEventForm = ({ event, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({ ...event });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (key !== "club") data.append(key, formData[key]); // Skip club field
    }
    onUpdate(event._id, data);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center">Edit Event</h2>

      {/* Input fields ... */}

      <div className="flex justify-between">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Update Event
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded-lg">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditEventForm;
