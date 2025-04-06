// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const EventCreationForm = () => {
//   const navigate = useNavigate();
//   const { token, user } = useSelector((state) => state.auth);
//   const [clubs, setClubs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     date: '',
//     time: '',
//     location: '',
//     club: '',
//     registrationLimit: 0,
//     image: null
//   });

//   useEffect(() => {
//     // Redirect non-admin users
//     if (!token || user?.role !== 'admin') {
//       navigate('/login');
//       return;
//     }

//     // Fetch clubs
//     const fetchClubs = async () => {
//       try {
//         const response = await axios.get('/api/clubs', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setClubs(response.data.clubs);
//       } catch (err) {
//         setError('Failed to fetch clubs');
//         console.error(err);
//       }
//     };

//     fetchClubs();
//   }, [token, user, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleImageChange = (e) => {
//     setFormData({
//       ...formData,
//       image: e.target.files[0]
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     if (!formData.title || !formData.description || !formData.date || 
//         !formData.time || !formData.location || !formData.club || !formData.image) {
//       setError('Please fill in all required fields');
//       setLoading(false);
//       return;
//     }

//     try {
//       const eventData = new FormData();
//       eventData.append('title', formData.title);
//       eventData.append('description', formData.description);
//       eventData.append('date', formData.date);
//       eventData.append('time', formData.time);
//       eventData.append('location', formData.location);
//       eventData.append('club', formData.club);
//       eventData.append('registrationLimit', formData.registrationLimit);
//       eventData.append('image', formData.image);

//       const response = await axios.post('/api/events/create', eventData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setSuccess('Event created successfully!');
//       setFormData({
//         title: '',
//         description: '',
//         date: '',
//         time: '',
//         location: '',
//         club: '',
//         registrationLimit: 0,
//         image: null
//       });

//       setTimeout(() => {
//         navigate('/events');
//       }, 2000);
      
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to create event');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Create New Event</h2>

//       {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
//       {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Event Title*</label>
//           <input className="shadow appearance-none border rounded w-full py-2 px-3" type="text" name="title" value={formData.title} onChange={handleChange} required />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Description*</label>
//           <textarea className="shadow border rounded w-full py-2 px-3" name="description" value={formData.description} onChange={handleChange} rows="4" required></textarea>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Date*</label>
//             <input className="shadow border rounded w-full py-2 px-3" type="date" name="date" value={formData.date} onChange={handleChange} required />
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Time*</label>
//             <input className="shadow border rounded w-full py-2 px-3" type="time" name="time" value={formData.time} onChange={handleChange} required />
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Location*</label>
//           <input className="shadow border rounded w-full py-2 px-3" type="text" name="location" value={formData.location} onChange={handleChange} required />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Club*</label>
//           <select className="shadow border rounded w-full py-2 px-3" name="club" value={formData.club} onChange={handleChange} required>
//             <option value="">Select a club</option>
//             {clubs.length > 0 ? (
//               clubs.map((club) => <option key={club._id} value={club._id}>{club.name}</option>)
//             ) : (
//               <option value="" disabled>No clubs available</option>
//             )}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Registration Limit (0 for unlimited)</label>
//           <input className="shadow border rounded w-full py-2 px-3" type="number" name="registrationLimit" value={formData.registrationLimit} onChange={handleChange} min="0" />
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Event Image*</label>
//           <input className="shadow border rounded w-full py-2 px-3" type="file" name="image" onChange={handleImageChange} accept="image/*" required />
//         </div>

//         <div className="flex items-center justify-between">
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={loading}>
//             {loading ? "Creating..." : "Create Event"}
//           </button>
//           <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => navigate('/events')}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EventCreationForm;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const EventCreationForm = () => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    club: "",
    registrationLimit: 0,
    image: null,
  });

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      navigate("/login");
      return;
    }

    const fetchClubs = async () => {
      try {
        const response = await axios.get("/api/clubs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClubs(response.data.clubs);
      } catch (err) {
        setError("Failed to fetch clubs");
        console.error(err);
      }
    };

    fetchClubs();
  }, [token, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const {
      title,
      description,
      date,
      time,
      location,
      club,
      image,
      registrationLimit,
    } = formData;

    if (!title || !description || !date || !time || !location || !club || !image) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const eventData = new FormData();
      eventData.append("title", title);
      eventData.append("description", description);
      eventData.append("date", date);
      eventData.append("time", time);
      eventData.append("location", location);
      eventData.append("club", club);
      eventData.append("registrationLimit", registrationLimit);
      eventData.append("image", image);

      const response = await axios.post("/events/create", eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Event created successfully!");
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        club: "",
        registrationLimit: 0,
        image: null,
      });

      setTimeout(() => {
        navigate("/events");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Event</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Event Title*</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="shadow border rounded w-full py-2 px-3"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Date*</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="shadow border rounded w-full py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Time*</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="shadow border rounded w-full py-2 px-3"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Location*</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Club*</label>
          <select
            name="club"
            value={formData.club}
            onChange={handleChange}
            required
            className="shadow border rounded w-full py-2 px-3"
          >
            <option value="">Select a club</option>
            {clubs.map((club) => (
              <option key={club._id} value={club._id}>
                {club.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Registration Limit (0 for unlimited)
          </label>
          <input
            type="number"
            name="registrationLimit"
            value={formData.registrationLimit}
            onChange={handleChange}
            min="0"
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Event Image*</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/events")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventCreationForm;
