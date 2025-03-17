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
    <div className="flex justify-between shadow-lg w-full">
      <div>
        <Link to={'/'} className="text-2xl font-bold p-2 m-2">ClubConnect</Link>
      </div>

      <div>
        <ul className="flex gap-6 mr-4 cursor-pointer text-lg">
          <li className="p-2 hover:text-purple-600">
            <Link to={'/about'}>About</Link>
          </li>
          <li className="p-2 hover:text-purple-600">
            <Link to={'/about'}>About</Link>
          </li>
          <li className="p-2 hover:text-purple-600">
            <Link to={'/about'}>About</Link>
          </li>

          {/* Check both Redux state and localStorage */}
          {!logged && localStorage.getItem("authStatus") !== "true" ? (
            <li className="p-2 hover:text-purple-600">
              <LoginButton />
            </li>
          ) : (
            <li className="p-2 hover:text-purple-600">
              {/* Use userRole or check localStorage directly */}
              {userRole === "student" ? (
                <Link to={'/stuprofile'}>Profile</Link>
              ) : userRole === "club-admin" ? (
                <Link to={'/adminprofile'}>Profile</Link>
              ) : null}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;