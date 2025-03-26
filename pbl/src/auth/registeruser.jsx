import axios from "axios";

export const registerUser = async (name, email, password, role, club = "") => {
    try {
        console.log("Sending registration request with:", { name, email, password, role, club });

        const response = await axios.post("http://localhost:5000/api/register", {
            name,
            email,
            password,
            role,
            club: role === "club-admin" ? club : undefined, // ✅ Always send club for club-admins
        });

        console.log("Registration successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Register Error:", error.response?.data || error);
        throw error.response?.data || { message: "Registration failed" };
    }
};
