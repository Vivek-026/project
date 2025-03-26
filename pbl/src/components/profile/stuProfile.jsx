import React, { useState, useEffect } from "react";
import LogoutButton from "../button/logoutButton";
import axios from "axios";
import PostList from "../form/PostList";

function StuProfile() {
    const [followedClubs, setFollowedClubs] = useState([]);
    const [availableClubs, setAvailableClubs] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchFollowedClubs();
        fetchAvailableClubs();
    }, []);

    const fetchFollowedClubs = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/follow/followed-clubs", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFollowedClubs(response.data.followedClubs || []);
        } catch (error) {
            console.error("Error fetching followed clubs:", error);
        }
    };

    const fetchAvailableClubs = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/clubs", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAvailableClubs(response.data || []);
        } catch (error) {
            console.error("Error fetching available clubs:", error);
        }
    };

    const handleFollowClub = async (clubId) => {
        try {
            await axios.post(`http://localhost:5000/api/follow/${clubId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Followed club successfully!");
            fetchFollowedClubs();
        } catch (error) {
            console.error("Error following club:", error);
        }
    };

    return (
        <div className="p-6 w-full bg-gray-50 rounded-xl shadow-md">
            <LogoutButton />
            <h2 className="text-3xl font-bold text-indigo-800 mb-6">PROFILE</h2>

            <div className="grid grid-cols-2 gap-6">
                {/* User Info with Profile Picture */}
                <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md flex flex-col items-center">
                    {/* Profile Picture (Circle) */}
                    <div className="h-24 w-24 rounded-full border-4 border-indigo-300 bg-gray-100 shadow-inner flex items-center justify-center text-2xl font-semibold text-indigo-600">
                        👤
                    </div>

                    <h3 className="text-2xl font-semibold text-indigo-700 mt-4">{localStorage.getItem("name")}</h3>
                    <p className="text-gray-700">{localStorage.getItem("email")}</p>
                </div>

                {/* Followed Clubs */}
                <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md">
                    <h3 className="text-2xl font-semibold text-indigo-700">Following Clubs</h3>
                    {followedClubs.length > 0 ? (
                        <ul className="mt-3">
                            {followedClubs.map((club) => (
                                <li key={club._id} className="text-lg text-gray-800 border-b pb-2 mb-2">
                                    {club.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">You are not following any clubs yet.</p>
                    )}
                </div>
            </div>

            {/* Available Clubs to Follow */}
            <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md mt-6">
                <h3 className="text-2xl font-semibold text-indigo-700">Available Clubs</h3>
                {availableClubs.length > 0 ? (
                    <ul className="mt-3">
                        {availableClubs.map((club) => (
                            <li key={club._id} className="flex justify-between items-center text-lg text-gray-800 border-b pb-2 mb-2">
                                {club.name}
                                <button
                                    onClick={() => handleFollowClub(club._id)}
                                    className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                                >
                                    Follow
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No clubs available to follow.</p>
                )}
            </div>

             {/* ✅ Show Posts Below Profile */}
             <div className="mt-8">
                <PostList />
            </div>
        </div>
    );
}

export default StuProfile;
