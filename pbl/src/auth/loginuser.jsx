export const loginUser = async (email, password, role) => {
    try {
      const response = await fetch("https://your-backend.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Login failed");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };