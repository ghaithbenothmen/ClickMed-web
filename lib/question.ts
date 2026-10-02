/**
 * "Posez-nous votre question": shared types and validation.
 * Used by the client form (instant feedback) and the server action (source of truth).
 */

export type QuestionField = "name" | "phone" | "email" | "contact" | "question";

export type QuestionInput = {
  name: string;
  phone: string;
  email: string;
  question: string;
  /** Subject key from `questionIntents`, empty when the visitor came without one. */
  intent: string;
  /** Honeypot: hidden from people, filled by bots. */
  website?: string;
};

export type QuestionErrors = Partial<Record<QuestionField, string>>;

export type QuestionResult =
  | { status: "success" }
  | { status: "invalid"; errors: QuestionErrors }
  | { status: "error"; reason: "not-configured" | "failed" };

/** Subjects a CTA can attach with `?sujet=<key>#question`. */
export const questionIntents = {
  essai: "Tester ClickMed gratuitement",
  partenaire: "Devenir partenaire",
  fondateur: "Offre médecin fondateur",
} as const;

export type QuestionIntent = keyof typeof questionIntents;

export function isQuestionIntent(value: string | null | undefined): value is QuestionIntent {
  return !!value && Object.prototype.hasOwnProperty.call(questionIntents, value);
}

export const QUESTION_MAX_LENGTH = 2000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateQuestion(input: QuestionInput): QuestionErrors {
  const errors: QuestionErrors = {};
  const name = input.name.trim();
  const phone = input.phone.trim();
  const email = input.email.trim();
  const question = input.question.trim();

  if (!name) errors.name = "Indiquez votre nom complet.";
  else if (name.length < 2) errors.name = "Votre nom doit contenir au moins 2 caractères.";

  if (!phone && !email) {
    errors.contact = "Indiquez un numéro de téléphone ou une adresse e-mail pour que nous puissions vous répondre.";
  }
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (!/^\+?[\d\s().-]+$/.test(phone) || digits.length < 8 || digits.length > 15) {
      errors.phone = "Ce numéro de téléphone ne semble pas valide.";
    }
  }
  if (email && !EMAIL_RE.test(email)) {
    errors.email = "Cette adresse e-mail ne semble pas valide (exemple : nom@domaine.tn).";
  }

  if (!question) errors.question = "Écrivez votre question.";
  else if (question.length < 10) errors.question = "Votre question est un peu courte : précisez-la en quelques mots.";
  else if (question.length > QUESTION_MAX_LENGTH) {
    errors.question = `Votre question dépasse ${QUESTION_MAX_LENGTH} caractères.`;
  }

  return errors;
}
