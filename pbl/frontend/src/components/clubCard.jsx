import React from "react";
import FollowButton from "./button/followButton";
import { CheckCircle } from 'lucide-react';

function ClubCard({ name = "Pictoreal", clubId = "67e0fe82a3bf4a0f49f0e0a2", verificationStatus = "Pending Verification" }) {
    return (
        <>
            <div className="flex justify-center m-5">
                <div className="w-md border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-indigo-50 transition-colors duration-200 shadow-sm hover:shadow cursor-pointer text-lg flex justify-between items-center">
                    {/* Club Name and Verification Status */}
                    <div className="ml-8 flex items-center gap-2">
                        {name}
                        {verificationStatus === "Verified" && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        <span className={`text-sm ${verificationStatus === "Verified" ? "text-green-600" : "text-gray-500"}`}>
                            ({verificationStatus})
                        </span>
                    </div>

                    {/* Follow Button */}
                    <div className="mr-8">
                        <FollowButton clubId={clubId} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClubCard;