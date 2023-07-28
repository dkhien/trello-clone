'use client'
import { useBoardStore } from "@/store/BoardStore";
import React, { useEffect, useState } from "react";

const todoMessages = [
  "Time to tackle your to-do list!",
  "Let's get started on your tasks!",
  "Your to-do list awaits your attention!",
  "Get ready to handle your tasks!",
  "It's time to conquer your to-dos!",
];

const inprogressMessages = [
  "Keep up the good work on your tasks in progress!",
  "Keep pushing forward on those in-progress tasks!",
  "Progress is key! Keep going!",
  "You're making great strides on your tasks in progress!",
  "Keep up the momentum on your in-progress tasks!",
];

const doneMessages = [
  "Congratulations on completing tasks, you're making great progress!",
  "Way to go! You've completed some tasks and made strides!",
  "Great job on completing tasks, keep up the awesome work!",
  "You're on a roll with completing tasks!",
  "Keep up the fantastic work on completing tasks!",
];

const noTasksMessages = [
  "You have no tasks at the moment. Take a break and relax!",
  "No tasks on your plate right now. Enjoy some free time!",
  "You're all caught up! Time for a well-deserved break!",
  "Nothing on your to-do list. Time to relax and recharge!",
];

function getRandomMessage(messages:string[]) {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

function SummaryMessage() {
  const [board] = useBoardStore((state) => [state.board]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);
    const todoNum = board.columns.get("todo")!.todos.length;
    const inprogressNum = board.columns.get("inprogress")!.todos.length;
    const doneNum = board.columns.get("done")!.todos.length;

    // Get the current time of day
    const currentHour = new Date().getHours();
    let greeting = "Hi";
    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    // Generate dynamic and interesting summaries for each category
    const countSummary = `You have ${todoNum} task${
      todoNum > 1 ? "s" : ""
    } to do, ${inprogressNum} task${
      inprogressNum > 1 ? "s" : ""
    } in progress, and ${doneNum} task${doneNum > 1 ? "s" : ""} done.`;

    let encouragementMessage = "";

    // Select encouragement message based on the situation
    if (todoNum === 0 && inprogressNum === 0 && doneNum === 0) {
      encouragementMessage = getRandomMessage(noTasksMessages);
    } else if (doneNum === board.columns.size) {
      encouragementMessage = getRandomMessage([
        ...doneMessages,
        "Congratulations! You've completed all your tasks!",
        "Wow! You've successfully finished all your tasks!",
      ]);
    } else if (doneNum > 0 && inprogressNum === 0 && todoNum === 0) {
      encouragementMessage = getRandomMessage(doneMessages);
    } else if (inprogressNum > 0 && todoNum === 0 && doneNum === 0) {
      encouragementMessage = getRandomMessage(inprogressMessages);
    } else {
      // If none of the above conditions match, select a random encouragement message
      encouragementMessage = getRandomMessage([
        ...todoMessages,
        ...inprogressMessages,
        ...doneMessages,
      ]);
    }

    const summaryMessage = `${greeting} Hien! ${countSummary} ${encouragementMessage} Have a productive day!`;

    setMessage(summaryMessage);
    setLoading(false);
  }, [board]);

  return (
    <div
      className={`flex flex-row items-center mt-5 mb-5 p-4 mx-auto w-5/6 shadow-xl rounded-lg bg-light-column-bg text-gray-700`}
    >
      <p className={`italic flex-5 ${loading && "animate-pulse"}`}>
        {message && !loading ? message : "Summarising your tasks..."}
      </p>
    </div>
  );
}

export default SummaryMessage;
