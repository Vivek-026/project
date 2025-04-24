import React, { useState } from "react";

function NewPost() {
    const [imagePreview, setImagePreview] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [likes, setLikes] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const club = localStorage.getItem("club");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!image) {
            alert("Please select an image!");
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append("name", club);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", image);
        formData.append("likes", likes);

        try {
            const response = await fetch("http://localhost:5000/posts", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                alert("Post uploaded successfully!");
                setTitle("");
                setContent("");
                setImage(null);
                setImagePreview(null);
                setLikes(0);
                window.location.reload();
            } else {
                alert("Failed to upload post: " + data.message);
            }
        } catch (error) {
            console.log("Error in adding post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 md:ml-72 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8">
                        <h2 className="text-3xl font-bold text-white text-center">Create New Post</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter an engaging title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 
                                    focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                    transition-all duration-200 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                Content
                            </label>
                            <textarea
                                id="content"
                                placeholder="Share your thoughts..."
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
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Image
                            </label>
                            <input
                                type="file"
                                id="image"
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
                            {isSubmitting ? 'Creating Post...' : 'Create Post'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewPost;