import React from "react";

export const getCards = async () => {
    try {
      const response = await fetch("CARDS"); 
      if (!response.ok) {
        throw new Error("Failed to fetch cards");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Cannot fetch cards:", error);
      throw error; 
      console.log("hi")
    }
  };