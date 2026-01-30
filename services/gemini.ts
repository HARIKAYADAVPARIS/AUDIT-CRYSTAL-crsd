import { GoogleGenAI } from "@google/generative-ai";

/**
 * Audit Crystal: Institutional-Grade CSRD Assurance
 * Repository Path: services/gemini.ts
 */

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI(apiKey);

/**
 * INSTITUTIONAL DOCUMENT ANALYSIS
 * Exported as a named function to satisfy Rollup/Vite build requirements.
 * Logic synchronized with Page 1 & 3 of the Assurance Brief.
 */
export async function analyzeDocument(file: File) {
  // Utilizing Gemini 1.5 Pro for multi-framework compliance mapping
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });

  const prompt = `
    Conduct an Institutional Pre-Assurance Audit:
    1. Framework Alignment Matrix: Verify alignment against ESRS (72%), GRI (94%), and ISSB standards[cite: 17, 19, 28, 29].
    2. Primary Disclosure Validation: Validate G1-1, E1-6, S1-1, and S2-1[cite: 47].
    3. Propagated Transparency: Identify data gaps and apply 'Penalty by Default' logic—providing best-to-worst case intervals for missing value-chain data[cite: 76, 77].
    4. Assurance Roadmap: Assess readiness for the 2026-2027 transition to Reasonable Assurance (ISSA 5000)[cite: 55, 68, 69].
    5. Scoring: Output an Aggregate Readiness Score and an Institutional Alpha rating[cite: 18, 19].
  `;
  
  const result = await model.generateContent([
    { inlineData: { mimeType: file.type, data: base64Data } },
    { text: prompt }
  ]);
  
  return result.response.text();
}

/**
 * STRATEGIC MARKET INTELLIGENCE
 * Based on HEC Paris S&O Center Policy Brief 42 (Jan 2026).
 */
export async function fetchPeerIntelligence(industry: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `
    Analyze ${industry} based on the HEC Paris Jan 2026 Policy Brief[cite: 80].
    Focus on how product-level sustainability reporting via digital scorecards 
    turns transparency into a strategic market advantage[cite: 86].
  `;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

/**
 * UTILITIES
 * Decodes audio data for CFO Briefings.
 */
export const decodeAudioData = async (base64: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
};
