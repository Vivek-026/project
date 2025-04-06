import React, { useEffect, useState } from "react";
import LogoutButton from "../button/logoutButton";
import StuClubs from "../stuClubs";

function StuProfile() {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("id");
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        const fetchFollowedClubs = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/follow/${userId}/followedClubs`);
                if (!response.ok) {
                    throw new Error("Failed to fetch followed clubs");
                }
                const data = await response.json();
                setClubs(data.followedClubs);
            } catch (error) {
                console.error("Error fetching followed clubs:", error);
            }
        };
        
        if (userId) {
            fetchFollowedClubs();
        }
    }, [userId]);

    return (
        <div className="min-h-screen bg-gray-50 md:ml-64">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Profile Header with Gradient */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 sm:px-8 py-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white">Student Dashboard</h2>
                            <LogoutButton />
                        </div>
                    </div>

                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Profile Details Section */}
                            <div className="w-full lg:w-1/3">
                                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                    <div className="flex flex-col items-center">
                                        {/* Profile Avatar */}
                                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-purple-100 to-indigo-50 border-4 border-white shadow-xl flex items-center justify-center mb-6 transform hover:scale-105 transition-transform duration-300">
                                            <span className="text-3xl sm:text-4xl font-bold text-purple-600">
                                                {name?.charAt(0)}
                                            </span>
                                        </div>

                                        {/* Profile Info Card */}
                                        <div className="w-full space-y-4">
                                            <div className="bg-gray-50 rounded-xl p-4 transform hover:scale-105 transition-transform duration-300">
                                                <h3 className="text-lg font-semibold text-gray-600">Name</h3>
                                                <p className="text-xl font-bold text-purple-600">{name}</p>
                                            </div>
                                            
                                            <div className="bg-gray-50 rounded-xl p-4 transform hover:scale-105 transition-transform duration-300">
                                                <h3 className="text-lg font-semibold text-gray-600">Email</h3>
                                                <p className="text-xl font-bold text-purple-600">{email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Following Section */}
                            <div className="w-full lg:w-2/3">
                                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-full">
                                    <h2 className="text-2xl font-bold text-purple-600 mb-6 pb-2 border-b border-gray-200">
                                        Clubs You Follow
                                    </h2>
                                    
                                    {clubs.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {clubs.map((club, index) => (
                                                <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                                                    <StuClubs club={club.name} />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                            <p className="text-gray-500 text-xl">
                                                You haven't followed any clubs yet.
                                            </p>
                                            <p className="text-gray-400 mt-2">
                                                Explore and follow clubs to see their updates here!
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StuProfile;