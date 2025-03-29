import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
    const { id } = useParams(); // Get post ID from URL
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        // Fetch post data for pre-filling the form
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
            navigate("/"); // Redirect to home or posts page
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Post</h2>
            <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        rows="6"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                {imagePreview && (
                    <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700">Image Preview:</h4>
                        <img src={imagePreview} alt="Preview" className="mt-2 max-w-full h-auto rounded-lg shadow-sm" />
                    </div>
                )}

                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditPost;
