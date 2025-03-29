import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginButton from "./button/loginButton";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/authSlice"; // Import your login action

function Navbar() {
  const [logged, setLogged] = useState(false);
  const dispatch = useDispatch();
  const log = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    // Check localStorage on component mount
    const token = localStorage.getItem("token");
    const authStatus = localStorage.getItem("authStatus");
    const storedUserData = localStorage.getItem("userData");
    
    // If we have auth data in localStorage but not in Redux, restore it
    if (authStatus === "true" && token && !log) {
      const userData = storedUserData ? JSON.parse(storedUserData) : {
        _id: token,
        role: localStorage.getItem("role"),
        email: localStorage.getItem("name")
      };
      
      dispatch(login({ userData }));
    }
  }, [dispatch, log]);

  useEffect(() => {
    setLogged(log);
  }, [log]);

  const userRole = user ? user.role : localStorage.getItem("role");

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg p-4">
      {/* Logo */}
      <Link to={'/'} className="text-2xl font-bold mb-6">ClubConnect</Link>

      {/* Navigation Links */}
      <ul className="flex flex-col gap-4">
        <li className="hover:text-purple-600">
          <Link to={'/clubs'}>Clubs</Link>
        </li>
        <li className="hover:text-purple-600">
          <Link to={'/events'}>Events</Link>
        </li>
        <li className="hover:text-purple-600">
          <Link to={'/calender'}>Calender</Link>
        </li>

        {/* Conditional Rendering for Login/Profile */}
        {!logged && localStorage.getItem("authStatus") !== "true" ? (
          <li className="hover:text-purple-600">
            <LoginButton />
          </li>
        ) : (
          <li className="hover:text-purple-600">
            {userRole === "student" ? (
              <Link to={'/stuprofile'}>Profile</Link>
            ) : userRole === "club-admin" ? (
              <Link to={'/adminprofile'}>Profile</Link>
            ) : null}
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;