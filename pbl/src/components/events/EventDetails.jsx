import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventById } from "../../api/eventApi";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getEvent = async () => {
      const data = await fetchEventById(id);
      setEvent(data);
    };
    getEvent();
  }, [id]);

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="p-6">
      <img src={event.image} alt={event.title} className="w-full h-60 object-cover rounded-lg" />
      <h2 className="text-2xl font-bold mt-4">{event.title}</h2>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
      <p><strong>Time:</strong> {event.time}</p>
      <p><strong>Location:</strong> {event.location}</p>
    </div>
  );
};

export default EventDetails;
