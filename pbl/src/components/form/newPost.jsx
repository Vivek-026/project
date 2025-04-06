import React, { useState } from "react";

function NewPost() {
    const [imagePreview, setImagePreview] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null); // Store file object
    const [likes, setLikes] = useState(0);
    const club = localStorage.getItem("club");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Show image preview
            setImage(file); // Store actual file
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert("Please select an image!");
            return;
        }

        const formData = new FormData();
        formData.append("name", club);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", image); // Append file
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
        }
        
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Create a New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        placeholder="Write your content here..."
                        rows="6"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                {imagePreview && (
                    <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700">Image Preview:</h4>
                        <img
                            src={imagePreview}
                            alt="Image preview"
                            className="mt-2 max-w-full h-auto rounded-lg shadow-sm"
                        />
                    </div>
                )}

                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add Post
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NewPost;
