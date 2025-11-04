import { NextResponse } from "next/server";
import { refinePrompt } from "@/lib/refinePrompt";

// If you're on Next 16, Node runtime is default; no need to mark "edge".
export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 400 });
    }

    const refined = await refinePrompt(prompt);

    // OpenAI Images (DALL·E) endpoint
    const resp = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: refined,
        size: "1024x1024",         // use "512x512" to save cost
        // style: "photorealistic", // optional
        // quality: "high",         // optional
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      const msg = data?.error?.message || `OpenAI error (status ${resp.status})`;
      return NextResponse.json({ error: msg }, { status: resp.status });
    }

    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) {
      return NextResponse.json({ error: "No image returned" }, { status: 500 });
    }

    return NextResponse.json({ imageBase64: b64 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}