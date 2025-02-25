
export const Add = async (name ,title, content, image, likes = 0) => {
    try {
        const apiUrl = "http://localhost:3000/posts";

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name , title, content, image, likes }),
        });

        if (!response.ok) {
            throw new Error(`Failed to add post: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in Add function:", error);
        throw error; 
    }
};