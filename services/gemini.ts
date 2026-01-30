import { GoogleGenAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI(apiKey);

/**
 * NAMED EXPORT: analyzeDocument
 * This must be present for App.tsx to find the function.
 */
export async function analyzeDocument(file: File) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });

  const prompt = `
    Institutional CSRD Audit Mode:
    1. Frameworks: ESRS, GRI, ISSB.
    2. Logic: Propagated Transparency & Penalty by Default.
    3. Goal: 2026 Reasonable Assurance readiness.
  `;
  
  const result = await model.generateContent([
    { inlineData: { mimeType: file.type, data: base64Data } },
    { text: prompt }
  ]);
  
  return result.response.text();
}
