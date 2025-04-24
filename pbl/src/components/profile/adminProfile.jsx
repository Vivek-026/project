import React, { useEffect, useState } from "react";
import LogoutButton from "../button/logoutButton";
import AdminCard from "../../adminCard";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCards } from "../../store/cardSlice";
import { getCards } from "../../auth/fetchCards";

function AdminProfile() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards);
  const name = localStorage.getItem("club");
  const admin = localStorage.getItem("name");
  const clubBio = localStorage.getItem("description");
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchFollowersCount = async () => {
      try {
        const clubId = localStorage.getItem("clubId");
        console.log("clubId:" ,clubId);

        const res = await fetch(`http://localhost:5000/api/clubs/${clubId}/followers-count`);
        const data = await res.json();
        setFollowersCount(data.followersCount);
        console.log(data);
        console.log(data.followersCount);
        console.log(followersCount);
      } catch (err) {
        console.error("Failed to fetch followers count", err);
      }
    };

    const clubId = localStorage.getItem("clubId");
    if (clubId) {
      fetchFollowersCount();
    }
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      const data = await getCards();
      dispatch(setCards(data));
    };

    if (!cards.length) {
      fetchCards();
    }
  }, [dispatch, cards.length]);

  const filteredCards = cards.filter((card) => card.name === name);

  const handleDeletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete post");
      dispatch(setCards(cards.filter((card) => card._id !== id)));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 md:ml-64">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 sm:px-8 py-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Club Dashboard</h2>
              <LogoutButton />
            </div>
          </div>

          {/* Profile Section */}
          <div className="px-6 sm:px-8 py-8">
            <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-purple-100 to-indigo-50 border-4 border-white shadow-xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <span className="text-3xl sm:text-4xl font-bold text-purple-600">{name?.charAt(0)}</span>
              </div>

              <div className="flex-1 text-center lg:text-left space-y-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">{name}</h1>
                <p className="text-gray-600 text-lg max-w-2xl">{clubBio}</p>
                <p className="text-purple-600 font-semibold text-lg">Managed by: {admin}</p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-6">
                  <div className="text-center bg-purple-50 px-6 py-3 rounded-xl">
                  <span className="block text-3xl font-bold text-purple-600">{followersCount}</span>

                    <span className="text-sm text-gray-600">Followers</span>
                  </div>

                  <div className="flex gap-4 flex-wrap">
                    <Link to="/newPost">
                      <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition duration-300 transform hover:scale-105 shadow-md hover:shadow-xl">
                        Create New Post
                      </button>
                    </Link>
                    <Link to="/create-event">
                      <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-300 transform hover:scale-105 shadow-md hover:shadow-xl">
                        Create New Event
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Recent Posts & Events
              </h2>

              {filteredCards.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500 text-xl mb-4">
                    No posts available for {name}
                  </p>
                  <Link to="/newPost">
                    <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition duration-300 transform hover:scale-105 shadow-lg">
                      Create Your First Post
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCards.slice().reverse().map((card, index) => (
                    <div key={index} className="group">
                      <div className="transform transition-all duration-300 hover:-translate-y-2">
                        <AdminCard
                          id={card._id}
                          club={card.name || "Unknown Club"}
                          title={card.title || "Untitled"}
                          content={card.content || "No content available."}
                          image={card.image || "https://via.placeholder.com/150"}
                          likes={card.likes || 0}
                          onDelete={handleDeletePost}
                        />
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Link to={`/event/${card._id}/registrations`}>
                            <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 shadow-md transition-all duration-300">
                              View Registrations
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
