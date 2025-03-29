import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCards } from "../store/cardSlice"; 
import { getCards } from "../auth/fetchCards";
import { useNavigate } from "react-router-dom";
import Card from "./cards";
import { motion } from "framer-motion";
import axios from "axios";

function Home() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards);
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');
  const [followedCards, setFollowedCards] = useState([]);
  const [followedClubIds, setFollowedClubIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!status) {
      navigate('/login');
    }

    const fetchCards = async () => {
      try {
        // Fetch all cards
        const allCardsData = await getCards(); 
        dispatch(setCards(allCardsData)); 

        // Fetch followed clubs
        const userId = localStorage.getItem("id");
        if (userId) {
          const response = await axios.get(`http://localhost:5000/api/follow/${userId}/followedClubs`);
          const clubs = response.data.followedClubs || [];
          setFollowedClubIds(clubs);

          // Fetch cards for followed clubs
          if (clubs.length > 0) {
            try {
              const followedCardsResponse = await axios.get('http://localhost:5000/api/cards/followed', {
                params: { clubs: clubs }
              });
              
              console.log('Followed Clubs:', clubs);
              console.log('Followed Cards:', followedCardsResponse.data);
              
              setFollowedCards(followedCardsResponse.data);
            } catch (cardsError) {
              console.error("Error fetching followed club cards:", cardsError);
              setFollowedCards([]);
            }
          }
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
    if (type === 'followed' && followedClubIds.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">You are not following any clubs.</p>
        </div>
      );
    }

    return cardsToRender.length > 0 ? (
      <div className="grid grid-cols-1 gap-6 md:gap-8">
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
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">
          {type === 'followed' 
            ? "No posts from your followed clubs." 
            : "No cards available."
          }
        </p>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tab Navigation */}
      <div className="flex mb-6 border-b">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 ${activeTab === 'all' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-500'}`}
        >
          All Club Posts
        </button>
        <button
          onClick={() => setActiveTab('followed')}
          className={`px-4 py-2 ${activeTab === 'followed' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-500'}`}
        >
          Followed Club Posts
        </button>
      </div>

      {/* Content Rendering */}
      {activeTab === 'all' 
        ? renderCards(cards, 'all')
        : renderCards(followedCards, 'followed')
      }
    </div>
  );
}

export default Home;