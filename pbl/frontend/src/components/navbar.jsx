import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice";
import { Menu, X, Home, Users, Calendar, Info, User, LogOut, LogIn } from "lucide-react";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const log = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);

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

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login");
    setIsOpen(false);
  };

  const userRole = user?.role || localStorage.getItem("role");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    { to: "/clubs", label: "Clubs", icon: Home },
    { to: "/events", label: "Events", icon: Users },
    { to: "/calender", label: "Calendar", icon: Calendar },
    { to: "/about", label: "About us", icon: Info },
    { 
      to: userRole === "club-admin" ? "/adminprofile" : "/stuprofile",
      label: "Profile",
      icon: User
    }
  ];

  return (
    <div className="relative">
      <button 
        className={`
          fixed top-4 left-4 z-50 md:hidden
          p-2 rounded-full shadow-lg
          bg-white hover:bg-gray-100
          transition-all duration-300 ease-in-out
          ${isOpen ? 'rotate-180' : 'rotate-0'}
        `}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={`
        fixed left-0 top-0 h-full bg-white shadow-xl
        transition-all duration-300 ease-in-out z-40
        md:translate-x-0 md:w-72
        ${isOpen ? "translate-x-0 w-72" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full">
          <Link 
            to="/" 
            className="flex items-center gap-3 p-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
            onClick={closeMenu}
          >
            <span className="text-2xl font-bold">ClubConnect</span>
          </Link>
          
          <div className="flex flex-col flex-grow p-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl
                    text-gray-700 hover:bg-purple-50 hover:text-purple-600
                    transition-all duration-200 group"
                >
                  <Icon size={22} className="group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
          
          <div className="p-6 border-t border-gray-100">
            {!log ? (
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center gap-4 px-5 py-4 rounded-xl
                  text-gray-700 hover:bg-purple-50 hover:text-purple-600
                  transition-all duration-200 group"
              >
                <LogIn size={22} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Login</span>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 px-5 py-4 rounded-xl w-full
                  text-red-600 hover:bg-red-50
                  transition-all duration-200 group"
              >
                <LogOut size={22} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Logout</span>
              </button>
            )}
          </div>
        </div>
      </nav>
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden" 
          onClick={toggleMenu}
        />
      )}
    </div>
  );
}

export default Navbar;