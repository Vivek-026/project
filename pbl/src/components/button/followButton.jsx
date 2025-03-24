import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Add axios to make HTTP requests

function FollowButton({ clubId }) {
  const [isFollowing, setIsFollowing] = useState(false);  // State to track if the club is followed
  const navigate = useNavigate();

  const handleFollowClick = async () => {
    try {
      const userId = "67e0f6f853190d28d4cf3f0f"; // Test User ID (replace with the actual logged-in user ID)

      const action = "follow";  // Determine the action (follow/unfollow)
      const url = action === "follow" ? "http://localhost:5000/api/follow/follow" : "http://localhost:5000/api/follow/unfollow";  // Define the API endpoint based on the action

      // Send the follow/unfollow request to the backend
      const response = await axios.post(url, { clubId });

      if (response.status === 200) {
        setIsFollowing(!isFollowing);  // Toggle follow status
        alert(`You have ${action === "follow" ? "followed" : "unfollowed"} the club.`);
      }
    } catch (error) {
      console.error("Error following/unfollowing the club:", error);
      alert("There was an error with following/unfollowing the club.");
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
