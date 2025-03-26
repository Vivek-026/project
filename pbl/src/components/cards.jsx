import React, { useState } from "react";

function Card({ club, title, content, image, likes }) {
  const [expanded, setExpanded] = useState(false);
  const [likeCount, setLikeCount] = useState(likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const maxLength = 100; 
  
  const clubName = club || "Pictoreal";
  const cardTitle = title || "Welcome";
  const cardContent = content || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi officia consequatur accusamus mollitia est neque.";
  const cardImage = image || "https://wallpapercave.com/wp/wp3479309.jpg";
  
  const needsTruncation = cardContent.length > maxLength;
  const displayContent = needsTruncation && !expanded 
    ? cardContent.slice(0, maxLength) + "..." 
    : cardContent;
    
  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (isLiked) {
      setLikeCount(prevCount => prevCount - 1);
    } else {
      setLikeCount(prevCount => prevCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <>
      
      <div className={`card-container max-w-md mx-auto cursor-pointer hover:shadow-md transition-shadow ${expanded ? 'hidden' : 'block'}`}
           onClick={() => setExpanded(true)}>
        <div className="text-left text-xl ml-5 mt-3 font-bold">
          {clubName}
        </div>
        
        <div className="border border-gray-200 m-2 p-2 rounded-2xl">
          <div>
            <img 
              className="rounded-2xl w-full h-48 object-cover" 
              src={cardImage} 
              alt={cardTitle} 
            />
          </div>
          <div className="text-left text-xl m-1 p-1 font-medium">
            {cardTitle}
          </div>
          <p className="text-left m-1 p-1 text-gray-700">
            {displayContent}
            {needsTruncation && (
              <span className="text-purple-600 ml-1">Read more</span>
            )}
          </p>
          <div className="text-left m-1 p-1 text-gray-500 flex items-center">
            <button 
              onClick={handleLikeClick}
              className="flex items-center focus:outline-none"
            >
              <svg 
                className={`w-5 h-5 mr-1 transition-colors ${isLiked ? 'text-red-500' : 'text-gray-500'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
              </svg>
              {likeCount} likes
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-90vh overflow-auto shadow-xl">
           
            <div className="text-right p-2">
              <button 
                onClick={() => setExpanded(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-4">
                <img 
                  className="rounded-lg w-full h-auto object-cover" 
                  src={cardImage} 
                  alt={cardTitle} 
                />
                <div className="mt-2 text-gray-500 flex items-center">
                  <button 
                    onClick={handleLikeClick}
                    className="flex items-center focus:outline-none"
                  >
                    <svg 
                      className={`w-5 h-5 mr-1 transition-colors ${isLiked ? 'text-red-500' : 'text-gray-500'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                    </svg>
                    {likeCount} likes
                  </button>
                </div>
              </div>
              
              <div className="md:w-1/2 p-4">
                <div className="text-xl font-bold mb-2">
                  {clubName}
                </div>
                <h2 className="text-2xl font-medium mb-4">
                  {cardTitle}
                </h2>
                <div className="text-gray-700 whitespace-pre-line">
                  {cardContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;