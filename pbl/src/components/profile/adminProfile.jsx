import React from "react";
import LogoutButton from "../button/logoutButton";
import AdminCard from "../../adminCard";
import { useSelector } from "react-redux";

function AdminProfile({ clubBio = "club about/info", followers = 245 }) {
  const cards = useSelector((state) => state.cards.cards);
  const user = localStorage.getItem("user") || "IEEE";
  const filteredCards = cards.filter((card) => card.club === user.name);

  return (
    <div className="flex flex-col w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">PROFILE</h2>
          <LogoutButton />
        </div>
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-indigo-600 flex-shrink-0"></div>
          <div className="flex-1 flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
            <p className="text-gray-600 text-sm">{clubBio}</p>
            <p className="text-gray-500 text-sm mt-2">{followers} Followers</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">POSTS</h2>
        <div className="grid grid-cols-3 gap-4">
          {filteredCards.length === 0 ? (
            <p className="text-gray-500">No posts available for {user.name}.</p>
          ) : (
            filteredCards.map((card, index) => (
              <AdminCard
                key={index}
                club={card.club || "Unknown Club"}
                title={card.title || "Untitled"}
                content={card.content || "No content available."}
                image={card.image || "https://via.placeholder.com/150"}
                likes={card.likes || 0}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;