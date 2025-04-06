import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../store/eventSlice";
import EventCard from "./EventCard";

const EventList = () => {
  const dispatch = useDispatch();
  const { events, status } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error fetching events</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
