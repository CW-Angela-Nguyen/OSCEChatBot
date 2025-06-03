
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: "YOUR_API_KEY_HERE", // Replace with your actual API key
  dangerouslyAllowBrowser: true
});

export async function getBotReply(messages) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error contacting OpenAI:", error);
    return "Sorry, I couldn't process that request.";
  }
}
