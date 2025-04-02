import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const EditEventForm = ({ event, onUpdateSuccess }) => {
    const [title, setTitle] = useState(event.title);
    const [description, setDescription] = useState(event.description);
    const [date, setDate] = useState(event.date);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.put(`/events/${event._id}`, { title, description, date });
            alert("Event updated successfully!");
            onUpdateSuccess(res.data);
        } catch (error) {
            console.error("Error updating event:", error);
            alert("Failed to update event.");
        }
    };

    return (
        <form onSubmit={handleUpdate} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Edit Event</h2>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event Title" className="w-full p-2 border rounded"/>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event Description" className="w-full p-2 border rounded mt-2"/>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded mt-2"/>
            <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">Update Event</button>
        </form>
    );
};

export default EditEventForm;
