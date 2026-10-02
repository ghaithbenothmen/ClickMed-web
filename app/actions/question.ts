"use server";

import {
  isQuestionIntent,
  questionIntents,
  validateQuestion,
  type QuestionInput,
  type QuestionResult,
} from "@/lib/question";

/**
 * Receives a visitor's question and forwards it to the ClickMed team.
 *
 * Delivery is configured with the QUESTION_WEBHOOK_URL environment variable
 * (any endpoint accepting a JSON POST: your API, a CRM, an automation tool…).
 * Without it, nothing is sent and the visitor is told so: the form never
 * pretends a question was delivered.
 *
 * Server Functions are reachable by direct POST, so everything is re-validated here.
 */
export async function sendQuestion(input: QuestionInput): Promise<QuestionResult> {
  const data: QuestionInput = {
    name: String(input?.name ?? ""),
    phone: String(input?.phone ?? ""),
    email: String(input?.email ?? ""),
    question: String(input?.question ?? ""),
    intent: String(input?.intent ?? ""),
    website: String(input?.website ?? ""),
  };

  // Honeypot filled: silently accept so bots learn nothing, but deliver nothing.
  if (data.website) return { status: "success" };

  const errors = validateQuestion(data);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };

  const endpoint = process.env.QUESTION_WEBHOOK_URL;
  if (!endpoint) {
    console.warn("[question] QUESTION_WEBHOOK_URL is not set: the question was not delivered.");
    return { status: "error", reason: "not-configured" };
  }

  const intent = isQuestionIntent(data.intent) ? data.intent : null;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name.trim(),
        phone: data.phone.trim() || null,
        email: data.email.trim() || null,
        question: data.question.trim(),
        intent,
        intentLabel: intent ? questionIntents[intent] : null,
        source: "site-clickmed",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`[question] Delivery failed with HTTP ${res.status}.`);
      return { status: "error", reason: "failed" };
    }
    return { status: "success" };
  } catch (error) {
    console.error("[question] Delivery failed.", error);
    return { status: "error", reason: "failed" };
  }
}
