import axiosInstance from "./axiosInstance";

export const createEvent = async (formData, token) => {
   try {
     const response = await axiosInstance.post("/events/create", formData, {
       headers: { 
         "Content-Type": "multipart/form-data",
         Authorization: `Bearer ${token}`,  // ✅ Ensure "Bearer" is included
       },
     });
     return response.data;
   } catch (error) {
     console.error("Error in createEvent API:", error.response?.data || error.message);
     throw error;
   }
 };
 