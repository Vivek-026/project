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
        
        // Ensure response has the expected structure
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-purple-800 flex items-center justify-center gap-4">
          <BookOpen className="text-purple-600" size={40} />
          Discover Clubs
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Explore a world of interests, connect with like-minded individuals, 
          and join clubs that spark your passion.
        </p>
      </div>

      <div className="mb-8 max-w-2xl mx-auto relative">
        <input 
          type="text" 
          placeholder="Search clubs by name or description..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-3 pl-10 border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-500 transition-all"
        />
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" 
          size={20} 
        />
      </div>

      {error ? (
        <div className="text-center text-red-600 flex flex-col items-center justify-center gap-2 p-4 bg-red-50 rounded-lg max-w-md mx-auto">
          <AlertCircle size={40} className="text-red-500" />
          <p className="font-medium">Error loading clubs</p>
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      ) : isLoading ? (
        <div className="text-center text-gray-600 flex items-center justify-center gap-2">
          <PlusCircle className="animate-pulse" />
          Loading Clubs...
        </div>
      ) : filteredClubs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredClubs.map((club) => (
              <motion.div
                key={club._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ClubCard 
                  name={club.name} 
                  clubId={club._id} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center text-gray-600 flex flex-col items-center justify-center gap-4">
          <Users size={40} className="text-purple-400" />
          <p>No clubs {searchTerm ? 'match your search' : 'found'}</p>
        </div>
      )}
    </div>
  );
}

export default Clubs;