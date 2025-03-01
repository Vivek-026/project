// Home.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCards } from "../store/cardSlice"; 
import { getCards } from "../auth/fetchCards";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards); // Access cards from the Redux store
  const status=useSelector((state)=>state.auth.status);
  const navigate= useNavigate();

  

  useEffect(() => {

    if(!status){
      navigate('/login');
    }

    const fetchCards = async () => {
      const data = await getCards(); 
      dispatch(setCards(data)); 
    };

    fetchCards();
  }, [dispatch]);

  return (
    <div>
    
      <div>
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <div key={index}>
              <h3>{card.title}</h3>
              <p>{card.content}</p>
            </div>
          ))
        ) : (
          <p>No cards available.</p>
        )}
      </div>
    </div>
  );
}

export default Home;