import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todos } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "When responding, welcome the user always as Hien Doan and say welcome to Trello! Limit the response to 200 characters.",
      },
      {
        role: "user",
        content: `Hi there, provide the summary of the following tasks. Count how many tasks are in each category such as To do, In progress and Done, then tell the user to have a good day! Here's the data: ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });
  const {data} = response;

  console.log("DATA: ", data);
  console.log(data.choices[0].message);

  return NextResponse.json(data.choices[0].message);
}

