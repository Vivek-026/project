import React, { useEffect, useState } from 'react';
import { fetchEventRegistrations } from '../api/eventApi';
import { useParams } from 'react-router-dom';

const EventRegistrations = () => {
  const { eventId } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRegistrations = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetchEventRegistrations(eventId, token);
        console.log("Fetched Registrations", data);
        setRegistrations(data.registrations || []);
      } catch (error) {
        console.error("Error loading registrations", error);
      } finally {
        setLoading(false);
      }
    };
    loadRegistrations();
  }, [eventId]);

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading registrations...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Registered Users</h2>
      {registrations.length === 0 ? (
        <p className="text-gray-600">No one has registered yet for this event.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left border-b">#</th>
                <th className="py-2 px-4 text-left border-b">Name</th>
                <th className="py-2 px-4 text-left border-b">Email</th>
                <th className="py-2 px-4 text-left border-b">Department</th>
                <th className="py-2 px-4 text-left border-b">Division</th>
                <th className="py-2 px-4 text-left border-b">Roll No</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{reg.name ?? 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{reg.email ?? 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{reg.department ?? 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{reg.division ?? 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{reg.rollNumber ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EventRegistrations;
