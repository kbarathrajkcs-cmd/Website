
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askTutor(question: string, history: ChatMessage[]) {
  const model = "gemini-3-flash-preview";
  const systemInstruction = `
    You are a friendly and expert Cybersecurity Tutor and Python Developer.
    Your goal is to help beginners understand password security and the Python code used to check it.
    - Always be encouraging.
    - Explain technical terms (like 'regex', 'entropy', 'brute force') simply.
    - Refer to the Python project code provided in the UI when relevant.
    - Maintain ethical standards: do not help with hacking or malicious activities.
    - Keep responses concise but educational.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [
      { role: 'user', parts: [{ text: systemInstruction }] },
      ...history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      })),
      { role: 'user', parts: [{ text: question }] }
    ],
    config: {
      temperature: 0.7,
      maxOutputTokens: 500,
    }
  });

  return response.text;
}
