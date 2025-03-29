import React, { useEffect, useState } from "react";
import LogoutButton from "../button/logoutButton";
import StuClubs from "../stuClubs";

function StuProfile() {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("id"); // Get userId from local storage
    const [clubs, setClubs] = useState([]);

    // Fetch followed clubs from backend
    useEffect(() => {
        const fetchFollowedClubs = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/follow/${userId}/followedClubs`);
                if (!response.ok) {
                    throw new Error("Failed to fetch followed clubs");
                }
                const data = await response.json();
                setClubs(data.followedClubs); // Update state with fetched club names
            } catch (error) {
                console.error("Error fetching followed clubs:", error);
            }
        };
        
        if (userId) {
            fetchFollowedClubs();
            console.log(clubs);
        }
    }, [userId]); // Run effect when userId changes

    return (
        <div className="p-6 w-full bg-gray-50 rounded-xl shadow-md">
            {/* Profile Header with Logout Button Positioned Correctly */}
            <div className="flex justify-between items-center mb-6">
                <div className="text-3xl font-bold text-indigo-800 border-b-2 border-indigo-200 pb-2">PROFILE</div>
                <LogoutButton />
            </div>

            <div className="flex gap-8">
                {/* Profile Details Section - Left Side */}
                <div className="w-1/3 relative">
                    <div className="border border-gray-300 rounded-lg p-6 shadow-md bg-white hover:shadow-lg transition-shadow duration-300 h-full">
                        <div className="flex flex-col items-center">
                            <div className="h-48 w-48 rounded-full border-4 border-indigo-300 flex-shrink-0 mb-6 bg-gray-100 shadow-inner"></div>

                            <div className="text-left w-full mt-4 p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-semibold text-gray-800 mb-3">
                                    Name: <span className="text-indigo-700">{name}</span>
                                </div>
                                <div className="text-xl text-gray-700">
                                    Email: <span className="text-indigo-600">{email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Following Section */}
                <div className="w-2/3 border border-gray-200 rounded-lg p-6 bg-white shadow-md">
                    <div className="text-2xl font-bold mb-6 text-indigo-700 border-b border-gray-200 pb-2">FOLLOWING</div>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Render followed clubs */}
                        {clubs.length > 0 ? (
                            clubs.map((club, index) => <StuClubs key={index} club={club.name} />)

                            
                        ) : (
                            <p className="text-gray-600">Not following any clubs yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StuProfile;
