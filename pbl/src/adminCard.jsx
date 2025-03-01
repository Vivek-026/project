import React from "react";
import Card from "./components/cards";
import { useSelector } from "react-redux";

function AdminCard({ club, title, content, image, likes }){



    return (
        <>
        <div className="aspect-square bg-gray-200 rounded-lg">
            <div className="border-2 rounded-lg">

            <Card 
            club={club}
            title={title}
            content={content}
            image={image}
            likes={likes}
            />
            </div>
            <div className="flex gap-2 m-1">

          <button className="flex justify-start text-lg m-1 pl-2 pr-2 pt-1 pb-1 bg-red-500 rounded-lg text-white">Delete</button>
          <button className="flex justify-start text-lg m-1 pl-2 pr-2 pt-1 pb-1 bg-gray-600 rounded-lg text-white">Edit</button>
            </div>
          </div>
        </>

    )
}

export default AdminCard;