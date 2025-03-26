import React, { useEffect, useState } from "react";
import axios from "axios";

function PostList() {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/posts");
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleDelete = async (postId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        try {
            await axios.delete(`http://localhost:5000/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(posts.filter((post) => post._id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleEdit = (post) => {
        setEditingPost(post);
        setTitle(post.title);
        setContent(post.content);
        setImage(null);
        setImagePreview(post.image); // ✅ Show existing image
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // ✅ Show new preview
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingPost) return;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) {
            formData.append("image", image); // ✅ Append new image if selected
        }

        try {
            await axios.put(`http://localhost:5000/posts/${editingPost._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            fetchPosts();
            setEditingPost(null);
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Recent Posts</h2>

            {posts.length === 0 ? (
                <p className="text-gray-500 text-center">No posts available.</p>
            ) : (
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div key={post._id} className="border border-gray-300 rounded-lg p-6 shadow-md bg-gray-50 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                            <p className="text-gray-700 mt-2">{post.content}</p>
                            {post.image && (
                                <img src={post.image} alt={post.title} className="w-full mt-4 rounded-lg shadow-md" />
                            )}
                            <p className="text-sm text-gray-500 mt-2">
                                Posted by: {post.createdBy?.name || "Unknown"}
                            </p>

                            {role && post.createdBy && (
                                <>
                                    {(role === "club-admin" || post.createdBy._id === userId) && (
                                        <div className="mt-4 flex gap-4">
                                            <button
                                                onClick={() => handleEdit(post)}
                                                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* UPDATE FORM MODAL */}
            {editingPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Update Post</h2>
                        <form onSubmit={handleUpdate}>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border rounded-md mb-2"
                                required
                            />

                            <label className="block text-sm font-medium text-gray-700">Content</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full p-2 border rounded-md mb-2"
                                required
                            />

                            <label className="block text-sm font-medium text-gray-700">Image (optional)</label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="w-full p-2 border rounded-md mb-4"
                            />

                            {/* Show existing or new preview */}
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className="w-full mt-4 rounded-lg shadow-md" />
                            )}

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setEditingPost(null)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostList;
