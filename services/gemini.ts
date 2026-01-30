import { GoogleGenAI } from "@google/generative-ai";

// Initialize the Gemini API with your Vercel Environment Variable
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI(apiKey);

/**
 * 1. INSTITUTIONAL DOCUMENT ANALYSIS
 * Logic: "Auditor Workpaper Mode"
 * This function processes uploaded CSRD documents and aligns them with
 * the Assurance Interoperability Matrix (ESRS, GRI, SASB, TCFD, ISSB).
 */
export async function analyzeDocument(file: File) {
  // Use Gemini 1.5 Pro for deep regulatory reasoning and compliance mapping
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });

  const prompt = `
    Role: Institutional CSRD Lead Auditor.
    Task: Audit the provided document for 'Auditor Workpaper Mode' readiness.
    
    1. Framework Alignment: Map findings to the Interoperability Matrix (ESRS, GRI, ISSB, SASB, TCFD).
    2. Primary Disclosures: Specifically validate G1-1 (Board role), E1-6 (Scope 1-3), S1-1 (Workforce), and S2-1 (Value Chain).
    3. Propagated Transparency: Identify data gaps. For missing supplier data, apply "Penalty by Default" logic and provide best-to-worst case intervals.
    4. Assurance Roadmap: Evaluate readiness for the 2026-2027 transition from Limited to Reasonable Assurance (ISSA 5000).
    5. Scoring: Output an Aggregate Readiness Score (%) and an 'Institutional Alpha' weighted average.
  `;
  
  const result = await model.generateContent([
    { inlineData: { mimeType: file.type, data: base64Data } },
    { text: prompt }
  ]);
  
  return result.response.text();
}

/**
 * 2. STRATEGIC INTELLIGENCE BRIEF
 * Logic: HEC Paris S&O Center Policy Brief 42 (Jan 2026)
 */
export async function fetchPeerIntelligence(industry: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    Analyze ${industry} benchmarks based on the HEC Paris S&O Center Jan 2026 Policy Brief.
    Focus on how transparency is becoming a strategic market advantage.
    Provide a 'Global Readiness Rank' for a typical firm in this sector.
  `;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

/**
 * 3. ESRS POLICY GENERATOR
 * Logic: ISSA 5000 & Omnibus I (2026 Standards)
 */
export async function generateESRSPolicy(topic: string, data: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    Draft a formal CSRD policy for the topic: ${topic}.
    Data Points: ${JSON.stringify(data)}.
    Compliance Standard: Dec 2024 IAASB ISSA 5000.
    Focus: Transition from administrative burden to strategic market influence.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

/**
 * 4. CFO EXECUTIVE BRIEFING (Audio)
 * Uses the latest 2026 TTS preview for professional summaries.
 */
export async function generateBriefingAudio(text: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-tts" });
  
  const response = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: `Professional Executive Summary: ${text}` }] }],
    generationConfig: {
      responseModalities: ["audio"],
    }
  });

  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
}

/**
 * 5. UTILITIES
 */
export const decodeAudioData = async (base64: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
};

export const decodeBase64 = (str: string) => atob(str);
export const encodeBase64 = (data: any) => btoa(String.fromCharCode(...new Uint8Array(data)));
