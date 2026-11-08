import { NextRequest, NextResponse } from 'next/server';

/**
 * Splits arbitrary Tagalog text into natural conversational chunks
 * respecting punctuation and length limits (~120 chars) for Google Translate TTS.
 */
function splitTextIntoChunks(text: string, maxLen = 120): string[] {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return [clean];

  const chunks: string[] = [];
  // Split on sentence boundaries first (. ! ?)
  const sentences = clean.split(/(?<=[.!?])\s+/);

  for (const sentence of sentences) {
    if (sentence.length <= maxLen) {
      chunks.push(sentence);
      continue;
    }

    // Split long sentences on clause boundaries (, ; : -)
    const clauses = sentence.split(/(?<=[,;:-])\s+/);
    let current = '';

    for (const clause of clauses) {
      if ((current + ' ' + clause).trim().length <= maxLen) {
        current = (current + ' ' + clause).trim();
      } else {
        if (current) chunks.push(current);
        if (clause.length <= maxLen) {
          current = clause;
        } else {
          // Fallback: split by words
          const words = clause.split(' ');
          let wordChunk = '';
          for (const word of words) {
            if ((wordChunk + ' ' + word).trim().length <= maxLen) {
              wordChunk = (wordChunk + ' ' + word).trim();
            } else {
              if (wordChunk) chunks.push(wordChunk);
              wordChunk = word;
            }
          }
          current = wordChunk;
        }
      }
    }
    if (current) chunks.push(current);
  }

  return chunks.filter((c) => c.trim().length > 0);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text');

  if (!text || text.trim().length === 0) {
    return NextResponse.json({ error: 'Text parameter is required' }, { status: 400 });
  }

  try {
    const chunks = splitTextIntoChunks(text, 120);
    if (chunks.length === 0) {
      return NextResponse.json({ error: 'Empty text' }, { status: 400 });
    }

    // Fetch authentic native Tagalog audio for each chunk
    const audioBuffers: Buffer[] = [];

    for (const chunk of chunks) {
      const encoded = encodeURIComponent(chunk.trim());
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=tl&client=tw-ob`;

      const res = await fetch(ttsUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'audio/mpeg, audio/*;q=0.9',
        },
      });

      if (!res.ok) {
        console.warn(`TTS fetch failed for chunk "${chunk}": ${res.status}`);
        continue;
      }

      const arrBuf = await res.arrayBuffer();
      audioBuffers.push(Buffer.from(arrBuf));
    }

    if (audioBuffers.length === 0) {
      return NextResponse.json(
        { error: 'Failed to generate authentic Filipino voice' },
        { status: 502 }
      );
    }

    // Concatenate all MP3 frame buffers
    const combinedBuffer = Buffer.concat(audioBuffers);

    return new NextResponse(combinedBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=604800, immutable',
        'Content-Length': combinedBuffer.length.toString(),
      },
    });
  } catch (err) {
    console.error('Error fetching authentic Filipino TTS:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
