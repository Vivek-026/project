import React, { useState } from "react";

import { registerUser } from "../../auth/registeruser";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch =useDispatch();
  const navigate=useNavigate();


  const state=useSelector((state)=>state.auth.status);


  useEffect(()=>{
    if(state){
      navigate('/');
    }

  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      const user = await registerUser(name, email, password, role);
      if(user){
        dispatch(login({userData: user.user}));
        

       
        localStorage.setItem("token", user.user._id);
        console.log(name, email, password, role);
        navigate('/');
      }
      else{
        console.log("no User");
      }

      
      setSuccess(true);
    } catch (error) {
      console.log("Error in register:", error);
      setError(error.message || "Registration failed. Please try again.");
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 border-purple-500 border-2">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Sign Up</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            Registration successful! You can now log in.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-black m-1">Full Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-3xl"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-black m-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-3xl"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 m-1">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full p-3 border border-gray-300 rounded-3xl"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-gray-700 m-1">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              className="w-full p-3 border border-gray-300 rounded-3xl"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 m-1">Role</label>
            <select
              id="role"
              className="w-full p-3 border border-gray-300 rounded-3xl"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="club-admin">Club Admin</option>
            </select>
          </div>

          {/* Signup Button */}
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="w-full bg-purple-500 text-white p-3 rounded-md hover:bg-purple-600 transition duration-200"
            >
              Sign Up
            </button>
          </div>

          {/* Already have an account? */}
          <div className="text-center text-gray-600">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-purple-500 hover:underline">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;