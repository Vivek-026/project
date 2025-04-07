import React, { useEffect, useState } from "react";
import { loginUser as apiLoginUser } from "../../auth/loginuser"; 
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (state) {
      navigate("/");
    }
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const user = await apiLoginUser(email, password, role);
      
      if (user) {
        dispatch(login({ userData: user.user }));
  
        localStorage.setItem("id", user.user._id);
        localStorage.setItem("name", user.user.name);
        localStorage.setItem("email", email);
        localStorage.setItem("role", user.user.role);
        localStorage.setItem("authStatus", "true");
        
        if (user.user.role === "club-admin" && user.club) {
          localStorage.setItem("club", user.club.name);
          localStorage.setItem("description", user.club.description);
          localStorage.setItem("clubId", user.club._id); // <-- ✅ ADD THIS LINE
        }
        

        if (user.token) {
          localStorage.setItem("token", user.token);
        }
  
        if (user.user.role === "club-admin" && user.club) {
          localStorage.setItem("club", user.club.name);
          localStorage.setItem("description", user.club.description);
        }
  
        navigate("/");
      } else {
        console.log("No user found");
      }
    } catch (error) {
      console.error("Error in logging in:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 md:ml-64">
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-purple-100">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-purple-800 mb-2">Welcome Back!</h2>
              <p className="text-gray-600">Please sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Role
                </label>
                <select
                  id="role"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="club-admin">Club Admin</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transform hover:scale-[1.02] transition-all duration-200 font-medium"
                >
                  Sign in
                </button>
              </div>

              <div className="text-center space-y-3">
                <a 
                  href="/forgot-password" 
                  className="text-sm text-purple-600 hover:text-purple-800 transition-colors duration-200"
                >
                  Forgot your password?
                </a>
                <div className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a 
                    href="/signup" 
                    className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;