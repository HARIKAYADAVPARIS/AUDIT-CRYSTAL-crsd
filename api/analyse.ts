import { GoogleGenerativeAI } from "@google/genai";

export const config = {
  runtime: 'edge', // This makes the AI response feel instant/streaming
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { fileBase64, mimeType } = await req.json();
    
    // Accessing the key securely from Vercel's environment
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // This initiates the "Streaming" audit log
    const result = await model.generateContentStream([
      { inlineData: { data: fileBase64, mimeType: mimeType } },
      { text: "Analyze this document for CSRD compliance. Be extremely detailed." },
    ]);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          controller.enqueue(encoder.encode(chunk.text()));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Audit Failed' }), { status: 500 });
  }
}
