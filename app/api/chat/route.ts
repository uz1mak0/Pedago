import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const { message, history, context } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const systemInstruction = `You are "Ate Malaya", a warm, encouraging, native Tagalog language tutor from Manila, Philippines.
Your mission is to help the user practice speaking and understanding everyday authentic Tagalog.
Guidelines:
1. Always reply primarily in natural conversational Tagalog (Filipino).
2. Provide a polite, friendly tone (use "po/opo" naturally or friendly colloquial markers like "naman", "kasi", "pala", "nga").
3. After your Tagalog response, provide:
   - [English Translation]: natural translation of what you said
   - [Vocabulary Breakdown]: 2-3 key words or particles with their root word and meaning
   - [Cultural Insight]: a 1-sentence tip on Filipino culture or etiquette related to the conversation.
4. Keep replies bite-sized (2-3 sentences in Tagalog) so learners don't get overwhelmed.
Current conversation scenario: ${context || 'Everyday friendly chat'}`;

    const promptText = `User says: "${message}"\n\nPlease respond in Tagalog as Ate Malaya following the instructions.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
      },
    });

    const reply = response.text || 'Magandang araw! Kumusta ka? Natutuwa akong makipag-usap sa iyo!';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error generating tutor reply:', error);
    // Graceful fallback for offline / development sandbox
    return NextResponse.json({
      reply:
        'Magandang araw! (Good day!) Natutuwa akong makipag-usap sa iyo. Tuloy lang ang pag-aaral!\n\n[English Translation]: Good day! I am glad to chat with you. Keep up the study!\n[Vocabulary Breakdown]:\n• "Maganda" = beautiful\n• "Araw" = day/sun\n• "Tuloy" = continue\n[Cultural Insight]: Greetings in the Philippines always begin with a warm wish for beauty and joy.',
    });
  }
}
