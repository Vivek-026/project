import React from "react";
import FollowButton from "./button/followButton";

function Clubs({ name = "Pictoreal" , clubId="67e0fe82a3bf4a0f49f0e0a2"}) {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-md border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-indigo-50 transition-colors duration-200 shadow-sm hover:shadow cursor-pointer text-lg flex justify-between items-center">
          {/* Club Name */}
          <div className="ml-8">
            {name}
          </div>

          {/* Follow Button */}
          <div className="mr-8">
            <FollowButton clubId={clubId}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Clubs;