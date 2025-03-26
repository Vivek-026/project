import React, { useState, useEffect } from "react";
import axios from "axios";

const EditPost = ({ postId, onClose, refreshPosts }) => {
    const [post, setPost] = useState({ title: "", content: "", image: "" });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`/api/posts/${postId}`);
                setPost(res.data);
            } catch (err) {
                console.error("Error fetching post:", err);
            }
        };
        fetchPost();
    }, [postId]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", post.title);
        formData.append("content", post.content);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            await axios.put(`/api/posts/${postId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Post updated successfully!");
            refreshPosts();
            onClose();
        } catch (err) {
            console.error("Error updating post:", err);
        }
    };

    return (
        <div className="modal">
            <h2>Edit Post</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    placeholder="Post Title"
                    required
                />
                <textarea
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    placeholder="Post Content"
                    required
                />
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {post.image && <img src={post.image} alt="Current" width="100" />}
                <button type="submit" style={{ backgroundColor: "blue", color: "white" }}>Update Post</button>
            </form>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default EditPost;
