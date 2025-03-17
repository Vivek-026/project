import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";


function LogoutButton(){
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogoutClick=()=>{

        try {

            dispatch(logout())
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("role");
            localStorage.removeItem("authStatus");
            localStorage.removeItem("userData");
            navigate('/login')
            
        } catch (error) {
            console.log("error in logout")
            
        }

    }

    return (
        <>
        <button 
      onClick={handleLogoutClick} 
      className="pl-3 pr-3 pt-1 pb-1 text-lg rounded-lg m-2 bg-purple-500 text-white"
    >
      Logout
    </button>

        
        </>
    )
}

export default LogoutButton;