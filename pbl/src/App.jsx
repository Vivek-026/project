import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/form/login";
import Register from "./components/form/register";
import StuProfile from "./components/profile/stuProfile";
import AdminProfile from "./components/profile/adminProfile";
import NewPost from "./components/form/newPost";
import Posts from "./components/form/posts";
import PostList from "./components/form/PostList";  // ✅ Import PostList
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
    const role = localStorage.getItem("role");

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />

                {/* Protected routes based on role */}
                <Route
                    path="/stuprofile"
                    element={role === "student" ? <StuProfile /> : <Navigate to="/" />}
                />
                <Route
                    path="/adminprofile"
                    element={role === "club-admin" ? <AdminProfile /> : <Navigate to="/" />}
                />

                {/* Post-related pages */}
                <Route path="/new-post" element={role === "club-admin" ? <NewPost /> : <Navigate to="/" />} />
                <Route path="/posts" element={<Posts />} />

                {/* ✅ Show Posts on Homepage for Everyone */}
                <Route path="/post-list" element={<PostList />} />

                {/* Fallback for unmatched routes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
