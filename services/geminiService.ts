import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Ensure this is available

let ai: GoogleGenAI | null = null;

try {
    if (apiKey) {
        ai = new GoogleGenAI({ apiKey });
    }
} catch (error) {
    console.error("Failed to initialize Gemini API", error);
}

export const createSymptomCheckerChat = (): Chat | null => {
  if (!ai) return null;
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are a helpful, empathetic, and professional medical AI assistant for HealthConnect. 
      Your goal is to help users understand their symptoms and guide them to the appropriate medical service on our platform (Doctor Consultation or Lab Test).
      
      Guidelines:
      1. disclaimer: ALWAYS start by stating you are an AI and not a substitute for professional medical advice.
      2. Ask clarifying questions if symptoms are vague.
      3. Suggest relevant specialists (e.g., Dermatologist for skin issues) or lab tests (e.g., CBC for fatigue) available on HealthConnect.
      4. Keep responses concise and easy to read.
      5. Do not provide a definitive diagnosis. Use phrases like "This could indicate..." or "It might be related to..."
      `,
    },
  });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't process that. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the medical database right now. Please try again later.";
  }
};
