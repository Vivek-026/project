import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/events");

        console.log("Fetched Events:", response.data.events); // Debugging Log

        if (Array.isArray(response.data.events)) {
          setEvents(response.data.events);
        } else {
          setEvents([]); // Ensures `events` is always an array
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};
