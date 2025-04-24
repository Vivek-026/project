import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [loading, setLoading] = useState(true); // ✅ Track loading state

    // ✅ Function to handle login
    const login = async (email, password) => {
        try {
            const res = await axiosInstance.post("/auth/login", { email, password });

            console.log("Login API Response:", res.data); // Debugging

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);  // ✅ Store token
                localStorage.setItem("user", JSON.stringify(res.data.user));  // ✅ Store user data
                setUser(res.data.user);  // ✅ Update user state
                console.log("Token stored:", localStorage.getItem("token")); // Debugging
            } else {
                console.error("Token missing in response!");
            }
        } catch (err) {
            console.error("Login failed:", err.response?.data);
        }
    };

    // ✅ Function to handle logout
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("authStatus");
        localStorage.removeItem("club");
        localStorage.removeItem("description");
        setUser(null);
      };
      

    // ✅ Fetch user when token exists
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await axiosInstance.get("/user/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(res.data.user);
                console.log("User Data:", res.data.user);
            } catch (err) {
                console.error("Error fetching user:", err.response?.data);
                logout(); // ✅ Auto-logout if token is invalid
            }
            setLoading(false);
        };

        fetchUser();
    }, []); // ✅ Runs once when the component mounts

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
