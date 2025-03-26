import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5000/api/reset-password/${token}`, { newPassword });

            if (response.status === 200) {
                setMessage("Password reset successfully! You can now log in.");
                setTimeout(() => navigate("/"), 2000); // Redirect to login after 2s
            }
        } catch (error) {
            setMessage("Failed to reset password.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">Reset Password</button>
            </form>
            {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
        </div>
    );
}

export default ResetPassword;
