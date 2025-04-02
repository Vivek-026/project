import React, { useEffect } from "react";
import LogoutButton from "../button/logoutButton";
import AdminCard from "../../adminCard";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCards } from "../../store/cardSlice";
import { getCards } from "../../auth/fetchCards";

function AdminProfile({ followers = 245 }) {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards);
  const name = localStorage.getItem("club");
  const admin = localStorage.getItem("name");
  const clubBio = localStorage.getItem("description");

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

  // 🔥 Delete function
  const handleDeletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete post");

      // Update state to remove the deleted post
      dispatch(setCards(cards.filter((card) => card._id !== id)));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Profile Dashboard</h2>
            <LogoutButton />
          </div>
        </div>

        {/* Profile Section */}
        <div className="px-8 py-6">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-4xl text-blue-600">{name}</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
              <p className="text-gray-600 mb-2 max-w-2xl">{clubBio}</p>
              <p className="text-gray-600 mb-4 max-w-2xl">ADMIN: {admin}</p>
              <div className="flex items-center justify-center md:justify-start gap-6">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-blue-600">{followers}</span>
                  <span className="text-sm text-gray-500">Followers</span>
                </div>
                <Link to="/newPost">
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg">
                    Create New Post
                  </button>
                </Link>
                <Link to="/create-event">
                  <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg">
                    Create New Event
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Recent Posts
            </h2>
            {filteredCards.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">
                  No posts available for {name}.
                </p>
                <Link to="/newPost">
                  <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200">
                    Create Your First Post
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCards.slice().reverse().map((card, index) => (
                  <AdminCard
                    key={index}
                    id={card._id}
                    club={card.name || "Unknown Club"}
                    title={card.title || "Untitled"}
                    content={card.content || "No content available."}
                    image={card.image || "https://via.placeholder.com/150"}
                    likes={card.likes || 0}
                    onDelete={handleDeletePost} // 🔥 Pass the delete function
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
