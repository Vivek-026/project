import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice"; // Import logout action

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const log = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);

  // ✅ Check LocalStorage on Component Mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const authStatus = localStorage.getItem("authStatus");
    const storedUserData = localStorage.getItem("userData");

    if (authStatus === "true" && token && !log) {
      const userData = storedUserData ? JSON.parse(storedUserData) : {
        _id: token,
        role: localStorage.getItem("role"),
        email: localStorage.getItem("email"),
        name: localStorage.getItem("name"),
      };

      dispatch(login({ userData }));
    }
  }, [dispatch, log]);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.clear();  // Clear all stored auth data
    dispatch(logout());  // Dispatch logout action
    navigate("/login");  // Redirect to login page
  };

  // ✅ Get User Role
  const userRole = user?.role || localStorage.getItem("role");

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg p-4">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold mb-6">ClubConnect</Link>

      {/* Navigation Links */}
      <ul className="flex flex-col gap-4">
        <li className="hover:text-purple-600">
          <Link to="/clubs">Clubs</Link>
        </li>
        <li className="hover:text-purple-600">
          <Link to="/events">Events</Link>
        </li>
        <li className="hover:text-purple-600">
          <Link to="/calender">Calendar</Link>
        </li>

        {/* ✅ Keep Profile Link Always Visible */}
        <li className="hover:text-purple-600">
          <Link to={userRole === "club-admin" ? "/adminprofile" : "/stuprofile"}>
            Profile
          </Link>
        </li>

        {/* ✅ Conditional Rendering for Login/Logout */}
        {!log ? (
          <li className="hover:text-purple-600">
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li className="hover:text-red-600 cursor-pointer" onClick={handleLogout}>
            Logout
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
