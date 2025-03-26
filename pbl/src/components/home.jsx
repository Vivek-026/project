import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCards } from "../store/cardSlice"; 
import { getCards } from "../auth/fetchCards";
import { useNavigate } from "react-router-dom";
import Card from "./cards";
import { motion } from "framer-motion";

function Home() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards);
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (!status) {
      navigate('/login');
    }

    const fetchCards = async () => {
      const data = await getCards(); 
      dispatch(setCards(data)); 
    };

    fetchCards();
  }, [dispatch, status, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {cards.slice().reverse().map((card, index) => (
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
          <p className="text-gray-600 text-lg">No cards available.</p>
        </div>
      )}
    </div>
  );
}

export default Home;