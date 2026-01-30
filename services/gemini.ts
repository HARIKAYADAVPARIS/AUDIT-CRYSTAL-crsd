import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI({ apiKey });

// 1. Institutional Document Analysis
export async function analyzeDocument(file: File) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Using Pro for deep compliance logic
  
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });

  const prompt = `
    Act as a CSRD Institutional Lead. Analyze this document using the 'Auditor Workpaper Mode' logic.
    1. Cross-reference against the Assurance Interoperability Matrix (ESRS, GRI, TCFD, ISSB)[cite: 39].
    2. Flag compliance gaps in G1-1, E1-6, S1-1, and S2-1 disclosures[cite: 47].
    3. Apply 'Propagated Transparency'[cite: 76]: Identify missing data and suggest 'Best-to-Worst' case intervals.
    4. Provide an 'Aggregate Readiness Score' (%) and an 'Institutional Alpha' rating[cite: 18, 19].
    5. Verify alignment with ISSA 5000 Protocol[cite: 55].
  `;
  
  const result = await model.generateContent([
    { inlineData: { mimeType: file.type, data: base64Data } },
    { text: prompt }
  ]);
  
  return result.response.text();
}

// 2. Automated Digital Scorecard Logic
export async function fetchPeerIntelligence(industry: string) {
  const prompt = `
    Retrieve 2026 market benchmarks for ${industry}. 
    Simulate 'Distributed Reporting' data pulls from supplier digital scorecards[cite: 74, 83].
    Provide a 'Global Readiness Rank' based on HEC Paris S&O Center Policy Brief 42[cite: 16, 80].
  `;
  const response = await genAI.models.generateContent({
    model: "gemini-1.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });
  return response.text;
}

// 3. ESRS/Omnibus I Policy Generator
export async function generateESRSPolicy(topic: string, data: any) {
  const prompt = `Draft a CSRD policy for ${topic}. Apply the Dec 2024 IAASB ISSA 5000 verification standards[cite: 62, 63].`;
  const response = await genAI.models.generateContent({
    model: "gemini-1.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });
  return response.text;
}

// 4. Executive Briefing & Live Tools
export async function generateBriefingAudio(text: string) {
  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Strategic Intelligence Brief: ${text} [cite: 70]` }] }],
    config: { responseModalities: ["audio"] }
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
}

export async function connectLiveAssistant(config: any) {
  return await genAI.live.connect({ model: "gemini-1.5-flash", ...config });
}

// 5. Shared Utilities
export const decodeAudioData = async (b64: string) => {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
};

export const decodeBase64 = (str: string) => atob(str);
export const encodeBase64 = (data: any) => btoa(String.fromCharCode(...new Uint8Array(data)));
