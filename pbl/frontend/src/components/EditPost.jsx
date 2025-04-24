import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:5000/posts/${id}`);
                if (!res.ok) throw new Error("Failed to fetch post");
                const data = await res.json();
                setTitle(data.title);
                setContent(data.content);
                setImagePreview(data.image);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPost();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) formData.append("image", image);

        try {
            const res = await fetch(`http://localhost:5000/posts/${id}`, {
                method: "PUT",
                body: formData
            });

            if (!res.ok) throw new Error("Failed to update post");

            alert("Post updated successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error updating post:", error);
            alert("Failed to update post. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 md:ml-72 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8">
                        <h2 className="text-3xl font-bold text-white text-center">Edit Post</h2>
                    </div>

                    <form onSubmit={handleUpdate} className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 
                                    focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                    transition-all duration-200 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content
                            </label>
                            <textarea
                                rows="6"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 
                                    focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                    transition-all duration-200 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Update Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200
                                    file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                    file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700
                                    hover:file:bg-purple-100 transition-all duration-200"
                            />
                        </div>

                        {imagePreview && (
                            <div className="rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full px-6 py-4 rounded-xl text-white font-semibold text-lg
                                transition-all duration-300 transform hover:scale-[1.02]
                                ${isSubmitting 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                                }`}
                        >
                            {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditPost;