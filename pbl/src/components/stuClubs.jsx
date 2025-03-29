import React from "react";

function StuClubs({club="Pictoreal"}){


    return (
        <>
        <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:bg-indigo-50 transition-colors duration-200 shadow-sm hover:shadow cursor-pointer text-lg">{club}</div>
        </>



    )
}

export default StuClubs;