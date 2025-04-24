import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, BookOpen, Users, PlusCircle, AlertCircle } from 'lucide-react';
import ClubCard from "./clubCard";
import { motion, AnimatePresence } from "framer-motion";

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await axios.get("http://localhost:5000/api/clubs");
        
        if (response.data && Array.isArray(response.data.clubs)) {
          setClubs(response.data.clubs);
          setFilteredClubs(response.data.clubs);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = clubs.filter(club => 
      club.name.toLowerCase().includes(term) || 
      (club.description && club.description.toLowerCase().includes(term))
    );
    
    setFilteredClubs(filtered);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 md:ml-64 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
          <p className="text-gray-600 text-xl font-medium">Discovering clubs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 md:ml-64">
      <div className="max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-purple-800 flex items-center justify-center gap-6 mb-6">
            <BookOpen className="text-purple-600" size={56} />
            Discover Clubs
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Explore a world of interests, connect with like-minded individuals, 
            and join clubs that spark your passion.
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16 max-w-3xl mx-auto"
        >
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search clubs by name or description..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-6 pl-16 bg-white border-2 border-purple-200 rounded-2xl 
                text-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 
                transition-all duration-200 shadow-lg"
            />
            <Search 
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-purple-400" 
              size={24} 
            />
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="relative">
          {error ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto text-center"
            >
              <AlertCircle size={64} className="text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Error loading clubs</h3>
              <p className="text-gray-600 text-lg">{error}</p>
            </motion.div>
          ) : filteredClubs.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            >
              <AnimatePresence>
                {filteredClubs.map((club) => (
                  <motion.div
                    key={club._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="transform hover:scale-105 transition-transform duration-200"
                  >
                    <ClubCard 
                      name={club.name} 
                      clubId={club._id} 
                      verificationStatus={club.isVerified ? "Verified" : "Pending Verification"}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-lg p-16 text-center max-w-2xl mx-auto"
            >
              <Users size={72} className="text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No clubs {searchTerm ? 'match your search' : 'found'}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {searchTerm 
                  ? 'Try adjusting your search terms or browse all clubs'
                  : 'Check back later for new clubs to join!'
                }
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Clubs;