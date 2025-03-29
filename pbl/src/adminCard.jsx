import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./components/cards";

function AdminCard({ id, club, title, content, image, likes, onDelete }) {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-200 rounded-lg p-4 shadow-md">
            <Card club={club} title={title} content={content} image={image} likes={likes} />
            <div className="flex gap-2 mt-2">
                <button 
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={async () => {
                        if (window.confirm("Are you sure you want to delete this post?")) {
                            try {
                                const res = await fetch(`http://localhost:5000/posts/${id}`, { method: "DELETE" });
                                if (!res.ok) throw new Error("Failed to delete post");
                                onDelete(id);
                            } catch (error) {
                                console.error("Error deleting post:", error);
                            }
                        }
                    }}
                >
                    Delete
                </button>
                <button 
                    className="bg-gray-600 text-white px-4 py-2 rounded"
                    onClick={() => navigate(`/edit/${id}`)} // Redirect to EditPost page
                >
                    Edit
                </button>
            </div>
        </div>
    );
}

export default AdminCard;
