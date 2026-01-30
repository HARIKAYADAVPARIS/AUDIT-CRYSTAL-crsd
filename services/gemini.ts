import { GoogleGenAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI(apiKey);

// NAMED EXPORT: This must match the import name in App.tsx
export async function analyzeDocument(file: File) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });

  const prompt = `
    Role: Lead Sustainability Auditor (Institutional Mode).
    Framework Alignment: ESRS, GRI, and ISSB standards.
    Specific Task: Apply 'Propagated Transparency' and 'Penalty by Default' logic to the value chain.
    Compliance: Align with ISSA 5000 for 2026 Reasonable Assurance.
  `;
  
  const result = await model.generateContent([
    { inlineData: { mimeType: file.type, data: base64Data } },
    { text: prompt }
  ]);
  
  return result.response.text();
}

export async function fetchPeerIntelligence(industry: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Benchmarking for ${industry} based on HEC Paris Policy Brief 42.`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}
