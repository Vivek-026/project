import React, { useState, useEffect } from "react";
import { registerUser } from "../../auth/registeruser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../store/authSlice";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [club, setClub] = useState(""); // ✅ Added club state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (state && role !== "club-admin") {
      navigate("/");
    }
  }, [state, role, navigate]);

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

    if (role === "club-admin" && !club) {
      setError("Club name is required for club-admins.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Registering user with:", { name, email, password, role, club });

      const user = await registerUser(name, email, password, role, role === "club-admin" ? club : "");

      if (user) {
        dispatch(loginSuccess(user.user));
        localStorage.setItem("token", user.token);
        localStorage.setItem("role", user.user.role);
        localStorage.setItem("club", user.user.club);
        setSuccess("Registration successful!");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 border-purple-500 border-2">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Sign Up</h2>

        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black m-1">Full Name</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-3xl" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="mb-4">
            <label className="block text-black m-1">Email</label>
            <input type="email" className="w-full p-3 border border-gray-300 rounded-3xl" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 m-1">Password</label>
            <input type="password" className="w-full p-3 border border-gray-300 rounded-3xl" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 m-1">Confirm Password</label>
            <input type="password" className="w-full p-3 border border-gray-300 rounded-3xl" placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 m-1">Role</label>
            <select className="w-full p-3 border border-gray-300 rounded-3xl" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="club-admin">Club Admin</option>
            </select>
          </div>

          {role === "club-admin" && (
            <div className="mb-4">
              <label className="block text-gray-700 m-1">Club Name</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded-3xl" placeholder="Enter club name" value={club} onChange={(e) => setClub(e.target.value)} required />
            </div>
          )}

          <button type="submit" className="w-full bg-purple-500 text-white p-3 rounded-md hover:bg-purple-600 transition duration-200">{isLoading ? "Processing..." : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
