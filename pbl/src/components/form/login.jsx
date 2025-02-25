import React, { useState } from "react";
import { loginUser as apiLoginUser } from "../../auth/loginuser"; 
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from "../../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //const user = await apiLoginUser(email, password, role);
      const user={};

      if (user) {
        dispatch(login({ userData: user }));

        navigate('/');

        //localStorage.setItem("token", user.token);
      } else {
        console.log("No user found");
      }

    } catch (error) {
      console.error("Error in logging in:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 border-purple-500 border-2">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Login</h2>

        <form onSubmit={handleSubmit}>
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
              />
            </div>
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

          {/* Login Button */}
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="w-full bg-purple-500 text-white p-3 rounded-md hover:bg-purple-600 transition duration-200"
            >
              Login
            </button>
          </div>

          {/* Forgot Password & Signup */}
          <div className="text-center text-gray-600">
            <p>
              <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
            </p>
            <p className="mt-2">
              Don’t have an account?{" "}
              <a href="/signup" className="text-purple-500 hover:underline">Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
