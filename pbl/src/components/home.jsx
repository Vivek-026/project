import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCards } from "../store/cardSlice"; 
import { getCards } from "../auth/fetchCards";
import { useNavigate } from "react-router-dom";
import Card from "./cards";
import { motion } from "framer-motion";
import axios from "axios";
import { Layout, Newspaper, Users } from "lucide-react";

function Home() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards);
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');
  const [followedCards, setFollowedCards] = useState([]);
  const [followedClubNames, setFollowedClubNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!status) {
      navigate('/login');
    }

    const fetchCards = async () => {
      try {
        const allCardsData = await getCards(); 
        dispatch(setCards(allCardsData)); 

        const userId = localStorage.getItem("id");
        if (userId) {
          const response = await axios.get(`http://localhost:5000/api/follow/${userId}/followedClubs`);
          const followedClubsArray = response.data.followedClubs || [];

          const clubNames = followedClubsArray.map(club => club.name); 
          setFollowedClubNames(clubNames);

          const filteredCards = allCardsData.filter(card =>
            clubNames.includes(card.name)
          );

          setFollowedCards(filteredCards);
        }
      } catch (error) {
        console.error("Error in card fetching process:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [dispatch, status, navigate]);

  const renderCards = (cardsToRender, type) => {
    if (type === 'followed' && followedClubNames.length === 0) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg shadow-sm"
        >
          <Users size={48} className="text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg font-medium mb-2">You're not following any clubs yet</p>
          <p className="text-gray-500 text-center">Follow some clubs to see their posts here!</p>
        </motion.div>
      );
    }

    return cardsToRender.length > 0 ? (
      <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
        {cardsToRender.slice().reverse().map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card
              club={card.name || "Unknown Club"}
              title={card.title || "Untitled"}
              content={card.content || "No content available."}
              image={card.image || "https://via.placeholder.com/150"}
              likes={card.likes || 0}
            />
          </motion.div>
        ))}
      </div>
    ) : (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg shadow-sm"
      >
        <Layout size={48} className="text-gray-400 mb-4" />
        <p className="text-gray-600 text-lg font-medium mb-2">No posts available</p>
        <p className="text-gray-500 text-center">
          {type === 'followed' 
            ? "Your followed clubs haven't posted anything yet." 
            : "There are no posts to display at the moment."
          }
        </p>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen md:ml-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <p className="text-gray-600 text-lg font-medium">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 md:ml-64">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 px-6 py-4 flex-1 justify-center transition-colors duration-200
                ${activeTab === 'all' 
                  ? 'border-b-2 border-purple-500 text-purple-500 bg-purple-50/50' 
                  : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Newspaper size={20} />
              <span className="font-medium">All Club Posts</span>
            </button>
            <button
              onClick={() => setActiveTab('followed')}
              className={`flex items-center gap-2 px-6 py-4 flex-1 justify-center transition-colors duration-200
                ${activeTab === 'followed' 
                  ? 'border-b-2 border-purple-500 text-purple-500 bg-purple-50/50' 
                  : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Users size={20} />
              <span className="font-medium">Followed Clubs</span>
            </button>
          </div>
        </div>

        {activeTab === 'all' 
          ? renderCards(cards, 'all')
          : renderCards(followedCards, 'followed')
        }
      </div>
    </div>
  );
}

export default Home;