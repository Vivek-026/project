export const getCards = async () => {
  try {
    const response = await fetch("http://localhost:5000/posts", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cards");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Cannot fetch cards:", error);
    throw error;
  }
};
