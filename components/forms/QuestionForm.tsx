"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { AlertCircle, CheckCircle2, Loader2, X } from "lucide-react";
import { sendQuestion } from "@/app/actions/question";
import { askQuestion } from "@/data/content";
import { PARAMS_EVENT } from "@/lib/scroll";
import {
  isQuestionIntent,
  QUESTION_MAX_LENGTH,
  questionIntents,
  validateQuestion,
  type QuestionErrors,
  type QuestionField,
  type QuestionIntent,
} from "@/lib/question";
import { cn } from "@/lib/utils";

type Values = { name: string; phone: string; email: string; question: string };
type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success" } | { kind: "error"; message: string };

const empty: Values = { name: "", phone: "", email: "", question: "" };

// The subject (?sujet=…) lives in the URL: read it as an external store.
function subscribeToParams(onChange: () => void) {
  window.addEventListener(PARAMS_EVENT, onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener(PARAMS_EVENT, onChange);
    window.removeEventListener("popstate", onChange);
  };
}
const readSujet = () => new URLSearchParams(window.location.search).get("sujet") ?? "";
const readSujetOnServer = () => "";
const fieldOrder: QuestionField[] = ["name", "contact", "phone", "email", "question"];

const inputBase =
  "w-full rounded-btn border bg-white px-4 text-[15px] text-ink transition-[border-color,box-shadow] duration-200 " +
  "placeholder:text-ink-soft/70 focus:border-deep focus:ring-4 focus:ring-lime/30 focus:outline-none";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[13px] font-medium text-danger">
      <AlertCircle size={14} strokeWidth={2.25} className="mt-0.5 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

/**
 * Question form. Fields are controlled so nothing typed is lost on error.
 * Validation runs on submit, then live once the visitor has tried to submit.
 */
export function QuestionForm() {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const copy = askQuestion.form;

  const [values, setValues] = useState<Values>(empty);
  const [website, setWebsite] = useState("");
  const sujet = useSyncExternalStore(subscribeToParams, readSujet, readSujetOnServer);
  const intent: QuestionIntent | null = isQuestionIntent(sujet) ? sujet : null;
  const [errors, setErrors] = useState<QuestionErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status.kind === "success") successRef.current?.focus();
  }, [status.kind]);

  const clearIntent = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("sujet");
    history.replaceState(null, "", url.pathname + url.search + url.hash);
    window.dispatchEvent(new Event(PARAMS_EVENT));
  };

  const update = (field: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (attempted) setErrors(validateQuestion({ ...next, intent: intent ?? "" }));
    if (status.kind === "error") setStatus({ kind: "idle" });
  };

  const focusFirstError = (errs: QuestionErrors) => {
    const first = fieldOrder.find((f) => errs[f]);
    const target = {
      name: nameRef,
      contact: phoneRef,
      phone: phoneRef,
      email: emailRef,
      question: questionRef,
    }[first ?? "name"];
    if (first) target.current?.focus();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === "submitting") return;
    setAttempted(true);

    const input = { ...values, intent: intent ?? "", website };
    const errs = validateQuestion(input);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      focusFirstError(errs);
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const result = await sendQuestion(input);
      if (result.status === "success") {
        setStatus({ kind: "success" });
      } else if (result.status === "invalid") {
        setErrors(result.errors);
        setStatus({ kind: "idle" });
        focusFirstError(result.errors);
      } else {
        setStatus({
          kind: "error",
          message: result.reason === "not-configured" ? copy.errorNotConfigured : copy.errorFailed,
        });
      }
    } catch {
      setStatus({ kind: "error", message: copy.errorFailed });
    }
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setAttempted(false);
    setStatus({ kind: "idle" });
    requestAnimationFrame(() => nameRef.current?.focus());
  };

  if (status.kind === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start gap-5 self-start rounded-panel border border-line bg-white p-6 shadow-card focus:outline-none sm:p-8"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-lime text-ink" aria-hidden>
          <CheckCircle2 size={24} strokeWidth={2.25} />
        </span>
        <p className="text-[22px] leading-snug font-semibold text-deep">{copy.success}</p>
        <button
          type="button"
          onClick={reset}
          className="text-[15px] font-semibold text-deep underline decoration-lime decoration-2 underline-offset-4 hover:text-logo"
        >
          {copy.another}
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";
  const errorCount = Object.keys(errors).length;
  const contactDescribedBy = [id("contact-hint"), errors.contact && id("contact-error")].filter(Boolean).join(" ");

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={`${uid}-title`}
      aria-busy={submitting}
      className="flex flex-col gap-6 self-start rounded-panel border border-line bg-white p-6 shadow-card sm:p-8"
    >
      <h3 id={`${uid}-title`} className="sr-only">
        {copy.title}
      </h3>

      {intent && (
        <div className="flex items-center justify-between gap-3 rounded-btn bg-soft px-4 py-3 ring-1 ring-line">
          <p className="text-[15px] text-ink">
            <span className="text-ink-soft">{copy.intentLabel} </span>
            <span className="font-semibold text-deep">{questionIntents[intent]}</span>
          </p>
          <button
            type="button"
            onClick={clearIntent}
            aria-label={copy.intentRemove}
            className="flex size-8 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-white hover:text-deep"
          >
            <X size={16} strokeWidth={2.25} aria-hidden />
          </button>
        </div>
      )}

      {/* Honeypot: off-screen and skipped by keyboard and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("website")}>Site web</label>
        <input
          id={id("website")}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor={id("name")} className="mb-2 block text-[15px] font-semibold text-deep">
          {copy.name} <span className="text-[13px] font-medium text-ink-soft">({copy.required})</span>
        </label>
        <input
          ref={nameRef}
          id={id("name")}
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={update("name")}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? id("name-error") : undefined}
          className={cn(inputBase, "h-12", errors.name ? "border-danger" : "border-line")}
        />
        <FieldError id={id("name-error")} message={errors.name} />
      </div>

      {/* Contact: phone or email, at least one */}
      <fieldset aria-describedby={contactDescribedBy}>
        <legend className="mb-1 text-[15px] font-semibold text-deep">{copy.contactLegend}</legend>
        <p id={id("contact-hint")} className="mb-3 text-[13px] text-ink-soft">
          {copy.contactHint}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={id("phone")} className="mb-2 block text-[13px] font-medium text-ink">
              {copy.phone}
            </label>
            <input
              ref={phoneRef}
              id={id("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={update("phone")}
              aria-invalid={!!(errors.phone || errors.contact)}
              aria-describedby={
                [errors.phone && id("phone-error"), errors.contact && id("contact-error")].filter(Boolean).join(" ") ||
                undefined
              }
              className={cn(inputBase, "h-12", errors.phone || errors.contact ? "border-danger" : "border-line")}
            />
            <FieldError id={id("phone-error")} message={errors.phone} />
          </div>
          <div>
            <label htmlFor={id("email")} className="mb-2 block text-[13px] font-medium text-ink">
              {copy.email}
            </label>
            <input
              ref={emailRef}
              id={id("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={update("email")}
              aria-invalid={!!(errors.email || errors.contact)}
              aria-describedby={
                [errors.email && id("email-error"), errors.contact && id("contact-error")].filter(Boolean).join(" ") ||
                undefined
              }
              className={cn(inputBase, "h-12", errors.email || errors.contact ? "border-danger" : "border-line")}
            />
            <FieldError id={id("email-error")} message={errors.email} />
          </div>
        </div>
        <FieldError id={id("contact-error")} message={errors.contact} />
      </fieldset>

      {/* Question */}
      <div>
        <label htmlFor={id("question")} className="mb-2 block text-[15px] font-semibold text-deep">
          {copy.question} <span className="text-[13px] font-medium text-ink-soft">({copy.required})</span>
        </label>
        <textarea
          ref={questionRef}
          id={id("question")}
          name="question"
          rows={5}
          maxLength={QUESTION_MAX_LENGTH}
          value={values.question}
          onChange={update("question")}
          placeholder={copy.questionPlaceholder}
          aria-required="true"
          aria-invalid={!!errors.question}
          aria-describedby={errors.question ? id("question-error") : undefined}
          className={cn(inputBase, "resize-y py-3 leading-relaxed", errors.question ? "border-danger" : "border-line")}
        />
        <FieldError id={id("question-error")} message={errors.question} />
      </div>

      {/* Live summary for screen readers once errors are shown */}
      <p className="sr-only" aria-live="polite">
        {attempted && errorCount > 0 ? copy.errorSummary(errorCount) : ""}
      </p>

      {status.kind === "error" && (
        <div role="alert" className="flex items-start gap-3 rounded-btn bg-danger-bg px-4 py-3.5 ring-1 ring-danger/20">
          <AlertCircle size={18} strokeWidth={2.25} className="mt-0.5 shrink-0 text-danger" aria-hidden />
          <p className="text-[15px] leading-snug text-danger">{status.message}</p>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-ink-soft">{copy.privacy}</p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-btn bg-deep px-6 text-[15px] font-semibold text-white shadow-deep transition-[filter,transform] duration-200 ease-out-soft hover:-translate-y-px hover:brightness-125 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0 disabled:hover:brightness-100"
        >
          {submitting && <Loader2 size={18} strokeWidth={2.25} className="animate-spin" aria-hidden />}
          {submitting ? copy.submitting : copy.submit}
        </button>
      </div>
    </form>
  );
}
