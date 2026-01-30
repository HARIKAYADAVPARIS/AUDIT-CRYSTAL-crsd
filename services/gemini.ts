import { GoogleGenAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI(apiKey);

/**
 * INSTITUTIONAL ANALYSIS ENGINE
 * Must use 'export' to satisfy the import in App.tsx
 */
export async function analyzeDocument(file: File) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });

  const prompt = `
    Conduct CSRD Pre-Assurance Audit:
    1. Framework Alignment: ESRS, GRI, ISSB.
    2. Logic: Apply 'Propagated Transparency' for value chain gaps.
    3. Standards: ISSA 5000 Reasonable Assurance readiness.
  `;
  
  const result = await model.generateContent([
    { inlineData: { mimeType: file.type, data: base64Data } },
    { text: prompt }
  ]);
  
  return result.response.text();
}

export async function fetchPeerIntelligence(industry: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(`Strategic benchmarking for ${industry} via HEC Paris Brief 42.`);
  return result.response.text();
}
