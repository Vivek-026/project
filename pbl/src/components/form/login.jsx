import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { loginSuccess } from "../../store/authSlice";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.status);

    useEffect(() => {
        // Redirect to profile page if already logged in
        const role = localStorage.getItem("role");
        if (isAuthenticated) {
            if (role === "student") {
                navigate("/student-profile");
            } else if (role === "club-admin") {
                navigate("/admin-profile");
            } else {
                navigate("/");
            }
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/login", { email, password });

            if (response.status === 200) {
                const { token, user } = response.data;

                // Store token and user details
                localStorage.setItem("token", token);
                localStorage.setItem("role", user.role);
                localStorage.setItem("name", user.name);
                localStorage.setItem("email", user.email);
                localStorage.setItem("authStatus", "true"); // Store login status
                localStorage.setItem("userData", JSON.stringify(user)); // Store full user data

                // Update Redux state
                dispatch(loginSuccess(user));

                // Redirect based on role
                if (user.role === "student") {
                    navigate("/stuprofile");
                } else if (user.role === "club-admin") {
                    navigate("/adminprofile");
                } else {
                    navigate("/");
                }
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed!");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">Login</button>
            </form>

            {/* ✅ Added Forgot Password & Sign Up Links */}
            <div className="text-center mt-4">
                <p className="text-gray-600">
                    <Link to="/forgot-password" className="text-blue-500 hover:underline">
                        Forgot Password?
                    </Link>
                </p>
                <p className="text-gray-600">
                    Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
