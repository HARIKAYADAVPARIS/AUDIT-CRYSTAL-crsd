import { GoogleGenAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI(apiKey);

/**
 * Institutional Document Analysis
 * Aligned with Page 1-3 of Audit Crystal PDF
 */
export async function analyzeDocument(file: File) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });

  const prompt = `
    Role: Institutional CSRD Lead.
    Task: Audit this document for 'Auditor Workpaper Mode'.
    1. Matrix Alignment: Map against ESRS, GRI, SASB, and TCFD.
    2. Propagated Transparency: Identify missing Scope 1-3 or value chain data and suggest 'Best-to-Worst' case intervals.
    3. Verification: Assess readiness for ISSA 5000 limited and reasonable assurance workflows.
    4. Metrics: Output an Aggregate Readiness Score (%) and Institutional Alpha rating.
  `;
  
  const result = await model.generateContent([
    { inlineData: { mimeType: file.type, data: base64Data } },
    { text: prompt }
  ]);
  
  return result.response.text();
}

/**
 * Fetch 2026 Peer Intelligence
 * Based on HEC Paris S&O Center Policy Brief 42
 */
export async function fetchPeerIntelligence(industry: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Provide 2026 benchmark data for ${industry} based on HEC Paris Policy Brief 42. Include Global Readiness Rank.`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}
