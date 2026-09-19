import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { planSchema } from "@/lib/ai-schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.subject || !body.topic) {
      return NextResponse.json({ error: "Subject and topic are required." }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({
        schedule: [{
          date: new Date().toISOString().slice(0, 10),
          sessions: [{ subject: body.subject, topic: body.topic, duration: 60, priority: "high" }]
        }]
      });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await client.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 800,
      system: "Create a concise study plan. Return JSON only: {schedule:[{date,sessions:[{subject,topic,duration,priority}]}]}. priority must be low, medium, or high. Do not invent extra topics.",
      messages: [{ role: "user", content: JSON.stringify(body) }]
    });

    const text = response.content[0]?.type === "text" ? response.content[0].text : "";
    const parsed = planSchema.parse(JSON.parse(text));
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "The AI planner is temporarily unavailable. Please retry." }, { status: 502 });
  }
}
