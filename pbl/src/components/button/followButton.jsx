import React, { useState, useEffect } from "react";
import axios from "axios";

function FollowButton({ clubId }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const checkFollowStatus = async () => {
            try {
                if (!token) return;
                const response = await axios.get("http://localhost:5000/api/follow/check", {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { clubId },
                });

                setIsFollowing(response.data.isFollowing);
            } catch (error) {
                console.error("Error checking follow status:", error);
            }
        };

        checkFollowStatus();
    }, [clubId, token]);

    const handleFollowClick = async () => {
        if (!token) {
            alert("Please log in to follow clubs!");
            return;
        }

        try {
            const url = isFollowing
                ? "http://localhost:5000/api/follow/unfollow"
                : "http://localhost:5000/api/follow/follow";

            const response = await axios.post(url, { clubId }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                setIsFollowing(!isFollowing);
                alert(`You have ${isFollowing ? "unfollowed" : "followed"} the club.`);
            }
        } catch (error) {
            console.error("Error following/unfollowing the club:", error);
            alert("There was an error processing your request.");
        }
    };

    return (
        <button
            onClick={handleFollowClick}
            className={`pl-3 pr-3 pt-1 pb-1 text-lg rounded-lg m-2 ${isFollowing ? 'bg-red-500' : 'bg-purple-500'} text-white`}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
}

export default FollowButton;
