import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events'); // Ensure the correct backend URL
      console.log("Fetched events:", response.data);  // Debugging
      setEvents(response.data?.events || []);  // Update state
      console.log("Updated events state:", events);  // Check if state is updated
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    console.log("Events updated in state:", events);
  }, [events]); 
  

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Campus Events</h1>
        
        {/* Only show create button for club admins */}
        {user?.role === 'admin' && (
          <button
            onClick={() => navigate('/eventCreation')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New Event
          </button>
        )}
      </div>
      
      {loading ? (
        <div className="text-center py-10">
          <span className="text-gray-500">Loading events...</span>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-10">
          <span className="text-gray-500">No events found</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Date:</span> {formatDate(event.date)} at {event.time}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Location:</span> {event.location}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {event.registrationLimit > 0 
                      ? `${event.registrations?.length || 0}/${event.registrationLimit} registered`
                      : `${event.registrations?.length || 0} registered`}
                  </span>
                  <button 
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm"
                    onClick={() => navigate(`/event/${event._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;