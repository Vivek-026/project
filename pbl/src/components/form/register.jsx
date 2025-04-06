import React, { useState, useEffect } from "react";
import { registerUser } from "../../auth/registeruser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import ClubRegistrationForm from "./club";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [adminId, setAdminId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (state && role !== "club-admin") {
      navigate("/");
    } else if (state && role === "club-admin" && !adminId) {
    }
  }, [state, role, adminId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    try {
      const user = await registerUser(name, email, password, role);
      if (user) {
        dispatch(login({ userData: user.user }));
        
        if (user.token) {
          localStorage.setItem("token", user.token);
        } else if (user.user && user.token) {
          localStorage.setItem("token", user.token);
        } else {
          localStorage.setItem("id", user.user._id);
          console.warn("No token returned from registerUser - using user ID instead");
        }
        
        localStorage.setItem("name", user.user.name);
        localStorage.setItem("email", email);
        localStorage.setItem("role", user.user.role); 
        localStorage.setItem("authStatus", "true");
        
        setAdminId(user.user._id);
        setSuccess("Registration successful!");
        
        if (role !== "club-admin") {
          setTimeout(() => navigate("/"), 1500);
        }
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error in register:", error);
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 md:ml-64">
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {!adminId ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-purple-100">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-purple-800 mb-2">Create Account</h2>
                <p className="text-gray-600">Join our community today</p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Role
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="club-admin">Club Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transform hover:scale-[1.02] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </button>

                <div className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <a 
                    href="/login" 
                    className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
                  >
                    Sign in
                  </a>
                </div>
              </form>
            </div>
          ) : (
            role === "club-admin" && <ClubRegistrationForm adminId={adminId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;