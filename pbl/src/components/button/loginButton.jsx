import React from "react";
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const navigate = useNavigate();  
  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <button 
      onClick={handleLoginClick} 
      className="pl-3 pr-3 pt-1 pb-1 text-lg rounded-lg m-2 bg-purple-500 text-white"
    >
      Login
    </button>
  );
}

export default LoginButton;
