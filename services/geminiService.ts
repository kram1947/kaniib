import { GoogleGenAI, Type } from "@google/genai";
import { Question, QuizState, SWOTAnalysis } from "../types";

// Initialize Gemini Client
// We use a safe fallback if the key is not present to prevent app crash on load, 
// though actual calls will fail without the key.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateSWOTAnalysis = async (
  topicName: string,
  state: QuizState,
  questions: Question[]
): Promise<SWOTAnalysis> => {
  if (!apiKey) {
    return {
      strengths: ["API Key missing"],
      weaknesses: ["Cannot analyze data"],
      opportunities: ["Add API Key to env"],
      threats: ["System offline"],
      summary: "Please configure the Gemini API Key to see your personalized AI analysis."
    };
  }

  const performanceSummary = state.history.map(h => {
    const q = questions.find(q => q.id === h.questionId);
    return {
      question: q?.text.substring(0, 50) + "...",
      difficulty: q?.difficulty,
      type: q?.type,
      correct: h.isCorrect,
      skipped: h.skipped,
      timeTaken: h.timeTaken
    };
  });

  const prompt = `
    Analyze the following math quiz performance for a Grade 9 IB MYP student on the topic: ${topicName}.
    Performance Data: ${JSON.stringify(performanceSummary)}
    
    Provide a SWOT analysis (Strengths, Weaknesses, Opportunities for improvement, Threats/Bad habits).
    Also provide a short encouraging summary.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
            threats: { type: Type.ARRAY, items: { type: Type.STRING } },
            summary: { type: Type.STRING }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as SWOTAnalysis;
    }
    throw new Error("No response text");
  } catch (error) {
    console.error("Gemini SWOT Error:", error);
    return {
      strengths: ["Analysis currently unavailable"],
      weaknesses: [],
      opportunities: ["Try again later"],
      threats: [],
      summary: "We couldn't generate the AI analysis at this moment."
    };
  }
};

export const getAIExplanation = async (question: Question): Promise<string> => {
  if (!apiKey) return "AI Help is unavailable without an API Key.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Explain how to solve this Grade 9 Math problem step-by-step. Keep it concise (under 100 words) and encouraging.
      Problem: ${question.text}
      Options: ${question.options.join(', ')}`,
    });
    return response.text || "No explanation available.";
  } catch (error) {
    console.error("Gemini Explain Error:", error);
    return "Sorry, I couldn't fetch a hint right now.";
  }
};

export const generateExtraQuestions = async (topic: string): Promise<Partial<Question>[]> => {
    if (!apiKey) return [];
    
    // Logic to generate more questions if needed
    // Simplified for this demo
    return [];
}
