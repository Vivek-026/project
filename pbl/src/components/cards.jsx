import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Card({ club, title, content, image, likes }) {
  const [expanded, setExpanded] = useState(false);
  const [likeCount, setLikeCount] = useState(likes || 40);
  const [isLiked, setIsLiked] = useState(false);
  const maxLength = 100;
  
  const clubName = club || "Pictoreal";
  const cardTitle = title || "Welcome";
  const cardContent = content || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi officia consequatur accusamus mollitia est neque.";
  const cardImage = image || "https://wallpapercave.com/wp/wp3479309.jpg";
  
  const needsTruncation = cardContent.length > maxLength;
  const displayContent = needsTruncation && !expanded 
    ? `${cardContent.slice(0, maxLength)}...` 
    : cardContent;
    
  const handleLikeClick = (e) => {
    e.stopPropagation();
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  return (
    <>
      {/* Compact Card View */}
      <motion.div 
        className={`card-container max-w-md mx-auto cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${expanded ? 'hidden' : 'block'}`}
        onClick={() => setExpanded(true)}
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          <div className="text-left text-sm font-semibold text-purple-600 mb-1">
            {clubName}
          </div>
          
          <div className="relative">
            <img 
              className="w-full h-48 object-cover rounded-lg"
              src={cardImage} 
              alt={cardTitle}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-lg">
              <h3 className="text-xl font-bold text-white">{cardTitle}</h3>
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-gray-600 text-sm">
              {displayContent}
              {needsTruncation && (
                <span className="text-purple-500 font-medium ml-1 cursor-pointer">Read more</span>
              )}
            </p>
          </div>
          
          <div className="mt-3 flex items-center">
            <button 
              onClick={handleLikeClick}
              className="flex items-center space-x-1 focus:outline-none"
            >
              <motion.div
                animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <svg 
                  className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                  viewBox="0 0 20 20"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                </svg>
              </motion.div>
              <span className="text-sm text-gray-600">{likeCount} likes</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Expanded Card View */}
      <AnimatePresence>
        {expanded && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setExpanded(false)}
            />
            
            <motion.div 
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <button 
                onClick={() => setExpanded(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-gray-100 transition-colors shadow-sm"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 h-64 md:h-auto relative">
                  <img 
                    className="w-full h-full object-cover"
                    src={cardImage} 
                    alt={cardTitle}
                  />
                  <div className="absolute bottom-4 left-4">
                    <button 
                      onClick={handleLikeClick}
                      className="flex items-center space-x-2 bg-white/90 px-3 py-2 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <motion.div
                        animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg 
                          className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                        </svg>
                      </motion.div>
                      <span className="font-medium text-gray-800">{likeCount} likes</span>
                    </button>
                  </div>
                </div>
                
                <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
                  <div className="text-sm font-semibold text-purple-600 mb-2">
                    {clubName}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {cardTitle}
                  </h2>
                  <div className="prose text-gray-700">
                    {cardContent.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Card;