import { GoogleGenAI } from "@google/generative-ai";

/**
 * Audit Crystal: Institutional-Grade CSRD Assurance
 * Path: /services/gemini.ts
 */

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI(apiKey);

/**
 * 1. INSTITUTIONAL DOCUMENT ANALYSIS
 * Logic: Auditor Workpaper Mode
 * Facilitates transition from Limited to Reasonable Assurance.
 */
export async function analyzeDocument(file: File) {
  // Use Gemini 1.5 Pro for multi-framework compliance mapping
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });

  const prompt = `
    Role: Lead Sustainability Auditor.
    Mode: Auditor Workpaper Mode.
    
    Tasks:
    1. Alignment Matrix: Map disclosure against ESRS, GRI, SASB, TCFD, and ISSB.
    2. Primary Disclosure Validation: Verify G1-1, E1-6, S1-1, and S2-1.
    3. Propagated Transparency: Identify missing upstream data and apply "Penalty by Default" logic with best-to-worst case intervals.
    4. Readiness Ranking: Calculate Aggregate Readiness (%) and Institutional Alpha (Weighted Avg).
    5. Assurance Protocol: Verify ISSA 5000 compliance for the 2026-2027 transition.
  `;
  
  const result = await model.generateContent([
    { inlineData: { mimeType: file.type, data: base64Data } },
    { text: prompt }
  ]);
  
  return result.response.text();
}

/**
 * 2. STRATEGIC INTELLIGENCE BRIEF
 * Source: HEC Paris S&O Center Jan 2026 Policy Brief 42.
 */
export async function fetchPeerIntelligence(industry: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `
    Analyze ${industry} based on HEC Paris Policy Brief 42.
    Focus on moving from administrative burden to market-driven influence.
    How does product-level reporting turn transparency into a strategic advantage?.
  `;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

/**
 * 3. UTILITIES
 * Standard exports for frontend interoperability.
 */
export const decodeAudioData = async (base64: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
};
