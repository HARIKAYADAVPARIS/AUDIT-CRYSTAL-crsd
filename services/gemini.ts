import { GoogleGenAI } from "@google/generative-ai";

/**
 * Audit Crystal: Institutional-Grade CSRD Assurance
 * Path: services/gemini.ts
 */

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI(apiKey);

/**
 * NAMED EXPORT: analyzeDocument
 * Resolves: "analyzeDocument" is not exported by "services/gemini.ts"
 */
export async function analyzeDocument(file: File) {
  // Utilizing Gemini 1.5 Pro for multi-framework compliance reasoning
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });

  const prompt = `
    Conduct an Institutional CSRD Pre-Assurance Audit:
    1. Framework Alignment Matrix: Verify against ESRS (72%), GRI (94%), and ISSB standards.
    2. Propagated Transparency: Identify data gaps and apply 'Penalty by Default' logic using best-to-worst case intervals.
    3. Assurance Roadmap: Evaluate readiness for 2026 Reasonable Assurance (ISSA 5000).
    4. Scoring: Output Aggregate Readiness Score and Institutional Alpha rank.
  `;
  
  const result = await model.generateContent([
    { inlineData: { mimeType: file.type, data: base64Data } },
    { text: prompt }
  ]);
  
  return result.response.text();
}

/**
 * STRATEGIC MARKET INTELLIGENCE
 * Source: HEC Paris Policy Brief 42
 */
export async function fetchPeerIntelligence(industry: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `
    Analyze ${industry} based on HEC Paris Policy Brief 42.
    How does product-level sustainability reporting turn transparency into a strategic market advantage?
  `;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

/**
 * UTILITY: AUDIO DECODING
 */
export const decodeAudioData = async (base64: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
};
