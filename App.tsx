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
 */
export async function analyzeDocument(file: File) {
  // Use Gemini 1.5 Pro for multi-framework compliance reasoning
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });

  const prompt = `
    Conduct an Institutional CSRD Pre-Assurance Audit:
    1. Framework Alignment Matrix: Verify against ESRS (72% target), GRI (94% target), and ISSB.
    2. Primary Disclosures: Validate G1-1, E1-6, S1-1, and S2-1.
    3. Propagated Transparency: Apply 'Penalty by Default' logic to missing value-chain data—providing best-to-worst case intervals.
    4. Assurance Protocol: Verify readiness for the 2026 Reasonable Assurance transition (ISSA 5000).
    5. Ranking: Output Aggregate Readiness Score and Institutional Alpha rank.
  `;
  
  const result = await model.generateContent([
    { inlineData: { mimeType: file.type, data: base64Data } },
    { text: prompt }
  ]);
  
  return result.response.text();
}

/**
 * 2. STRATEGIC INTELLIGENCE
 * Source: HEC Paris S&O Center Policy Brief 42 (Jan 2026)
 */
export async function fetchPeerIntelligence(industry: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Analyze ${industry} based on HEC Paris Policy Brief 42. How does product-level reporting turn transparency into a strategic advantage?`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

/**
 * 3. UTILITIES
 */
export const decodeAudioData = async (base64: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
};
