import { GoogleGenerativeAI } from "@google/generative-ai";

export async function onRequestPost(context) {
    const { request, env } = context;
    const data = await request.json();
    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Act as a doctor. Provide a structured medical note for patient ${data.name} (Phone: ${data.phone}) with symptoms: ${data.symptoms}. Include a 'Suggested Diagnosis' and 'Suggested Medication'. Keep it professional.`;
    const result = await model.generateContent(prompt);
    return new Response(JSON.stringify({ content: result.response.text() }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
