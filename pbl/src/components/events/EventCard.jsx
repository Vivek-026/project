import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-bold">{event.title}</h3>
      <p>{event.description}</p>
      <p>{new Date(event.date).toDateString()} | {event.time}</p>
      <Link to={`/events/${event._id}`} className="text-blue-500">View Details</Link>
    </div>
  );
};

export default EventCard;
