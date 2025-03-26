import React, { useState, useEffect } from "react";
import axios from "axios";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const userRole = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/posts");
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Club Posts</h2>
            {posts.length === 0 ? (
                <p className="text-center text-gray-500">No posts available.</p>
            ) : (
                posts.map(post => (
                    <div key={post._id} className="border-b pb-4 mb-4">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <p>{post.content}</p>
                        <img src={post.image} alt="Post" className="w-full h-40 object-cover rounded-md mt-2" />
                        <p className="text-sm text-gray-500">Posted by: {post.createdBy.name}</p>

                        {/* Club-Admins can Edit/Delete Their Own Posts */}
                        {userRole === "club-admin" && post.createdBy._id === userId && (
                            <div className="mt-2">
                                <button 
                                    onClick={() => handleDelete(post._id)} 
                                    className="text-red-500 hover:underline mr-4">
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default Posts;
