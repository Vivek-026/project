import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClubRegistrationForm = ({ adminId }) => {
    const [clubData, setClubData] = useState({ name: "", description: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setClubData({ ...clubData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setMessage("");
        
        try {
            // Get the token from localStorage
            const token = localStorage.getItem("token");
            
            if (!token) {
                throw new Error("Authentication token not found");
            }
            
            // Send the token in the header as is (without 'Bearer ' prefix)
            // This matches your middleware which uses req.header('Authorization')
            const response = await axios.post(
                "http://localhost:5000/clubs/create", 
                {
                    name: clubData.name,
                    description: clubData.description,
                    // We still need to send admin ID if your backend expects it
                    admin: adminId,
                },
                {
                    headers: {
                        'Authorization': token
                    }
                }
            );
            
            setMessage(response.data.message || "Club created successfully!");
            localStorage.setItem("club", clubData.name);
            localStorage.setItem("description", clubData.description);
            
            // Navigate to home after successful club creation
            setTimeout(() => navigate("/"), 1500);
        } catch (error) {
            console.error("Club creation error:", error);
            if (error.response && error.response.status === 401) {
                setError("Access denied. Please log in again.");
            } else {
                setError(
                    error.response?.data?.message || 
                    error.message || 
                    "Error creating club"
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-black">Create Your Club</h2>
            
            {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
            {message && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{message}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-black m-1">Club Name</label>
                    <input
                        type="text"
                        name="name"
                        value={clubData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-3xl"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black m-1">Club Description</label>
                    <textarea
                        name="description"
                        value={clubData.description}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-3xl"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-500 text-white p-3 rounded-md hover:bg-purple-600 transition duration-200"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "Create Club"}
                </button>
            </form>
        </div>
    );
};

export default ClubRegistrationForm;