import axiosInstance from "./axiosInstance";

// Create a new event
export const createEvent = async (formData, token) => {
  try {
    const response = await axiosInstance.post("/events/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in createEvent API:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch all events
export const fetchEvents = async () => {
  try {
    const response = await axiosInstance.get("/events");
    return response.data;
  } catch (error) {
    console.error("Error in fetchEvents API:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch a single event by ID
export const fetchEventById = async (eventId) => {
  try {
    const response = await axiosInstance.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchEventById API:", error.response?.data || error.message);
    throw error;
  }
};

// Register for an event
export const registerForEvent = async (eventId, token) => {
  try {
    const response = await axiosInstance.post(`/events/${eventId}/register`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in registerForEvent API:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch registrations for an event (club-admin only)
export const fetchEventRegistrations = async (eventId, token) => {
  try {
    const response = await axiosInstance.get(`/events/${eventId}/registrations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in fetchEventRegistrations API:", error.response?.data || error.message);
    throw error;
  }
};


