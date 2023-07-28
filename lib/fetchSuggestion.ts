import { formatTasksForAI } from "@/lib/formatTasksForAI";

const fetchSuggestion = async (board: Board) => {
  try {
    const formattedTasks = formatTasksForAI(board);

    const res = await fetch("/api/generateSummary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formattedTasks }),
    });

    console.log(res);

    if (!res.ok) {
      // Check if the response status is not OK and handle the error
      throw new Error("Network response was not ok.");
    }

    const GPTData = await res.json();
    const { content } = GPTData;
    return content;
  } catch (error) {
    console.error("Error in fetchSuggestion:", error);
    return "Something went wrong!";
  }
};

export default fetchSuggestion;
