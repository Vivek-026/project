import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <img
        src={event.image?.url || event.image}
        alt={event.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-xl font-semibold mt-2">{event.name}</h3>
      <p className="text-gray-600">{new Date(event.date).toDateString()}</p>
      <p><strong>Time:</strong> {event.time}</p>
      <p><strong>Limit:</strong> {event.registrationLimit || "Unlimited"}</p>
      <Link to={`/events/${event._id}`} className="text-blue-500 mt-2 inline-block">
        View Details
      </Link>
    </div>
  );
};

export default EventCard;
