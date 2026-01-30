import { GoogleGenAI } from "@google/generative-ai";

/**
 * Audit Crystal: Institutional-Grade CSRD Assurance
 * Repository Path: services/gemini.ts
 */

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI(apiKey);

/**
 * 1. INSTITUTIONAL DOCUMENT ANALYSIS
 * Named Export: analyzeDocument
 * Logic: Auditor Workpaper Mode (Propagated Transparency)
 */
export async function analyzeDocument(file: File) {
  // Using Gemini 1.5 Pro for multi-framework compliance reasoning
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });

  const prompt = `
    Task: Conduct an Institutional CSRD Pre-Assurance Audit.
    Frameworks: ESRS (72%), GRI (94%), ISSB, TCFD, SASB.
    
    1. Apply 'Propagated Transparency' logic: Identify missing data and apply 
       'Penalty by Default' using best-to-worst case intervals.
    2. Verification: Align with ISSA 5000 for 2026 Reasonable Assurance.
    3. Output: Aggregate Readiness Score (%) and Institutional Alpha rank.
  `;
  
  const result = await model.generateContent([
    { inlineData: { mimeType: file.type, data: base64Data } },
    { text: prompt }
  ]);
  
  return result.response.text();
}

/**
 * 2. STRATEGIC INTELLIGENCE BRIEF
 * Source: HEC Paris Policy Brief 42 (Jan 2026)
 */
export async function fetchPeerIntelligence(industry: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Analyze ${industry} benchmarks based on HEC Paris Policy Brief 42 regarding strategic transparency advantage.`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

/**
 * 3. UTILITY: AUDIO DECODING
 */
export const decodeAudioData = async (base64: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
};
