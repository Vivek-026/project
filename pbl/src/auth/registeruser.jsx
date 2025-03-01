export const registerUser = async (name,email, password, role) => {
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Register failed");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Register Error:", error);
      throw error;
    }
  };