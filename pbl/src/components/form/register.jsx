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
    // Only redirect if they've completed all steps
    if (state && role !== "club-admin") {
      navigate("/");
    } else if (state && role === "club-admin" && !adminId) {
      // Club admin who hasn't completed registration - stay on page
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
        
        // Check if token is returned from registerUser
        if (user.token) {
          localStorage.setItem("token", user.token);
        } else if (user.user && user.token) {
          localStorage.setItem("token", user.token);
        } else {
          // In case no token is returned, we need at least a user ID
          // Note: This won't work with your current middleware but is a fallback
          localStorage.setItem("token", user.user._id);
          console.warn("No token returned from registerUser - using user ID instead");
        }
        
        localStorage.setItem("name",user.user.name);
        localStorage.setItem("email",email);
        localStorage.setItem("role", user.user.role); 
        localStorage.setItem("authStatus", "true");
        
        setAdminId(user.user._id);
        setSuccess("Registration successful!");
        
        // If student, redirect to home
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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 border-purple-500 border-2">
        {!adminId ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-black">Sign Up</h2>

            {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
            {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{success}</div>}

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-black m-1">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-3xl"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-black m-1">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-3xl"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-gray-700 m-1">Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-3xl"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="block text-gray-700 m-1">Confirm Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-3xl"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {/* Role Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 m-1">Role</label>
                <select
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
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Sign Up"}
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
          </>
        ) : (
          role === "club-admin" && <ClubRegistrationForm adminId={adminId} />
        )}
      </div>
    </div>
  );
};

export default Signup;