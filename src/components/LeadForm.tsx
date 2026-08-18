"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { submitLead, LeadError } from "@/lib/leads";
import { validateLead, hasErrors, type LeadErrors, type LeadValues } from "@/lib/validate";
import { trackLead } from "@/lib/fbq";
import { gaLead } from "@/lib/gtag";
import { TELEGRAM_URL } from "@/lib/constants";

const EMPTY: LeadValues = { name: "", contact: "", niche: "", website: "" };

interface Props {
  /** Ідентифікатор форми — потрапляє в таблицю й у події аналітики. */
  formId: string;
  /** Показувати поле «ніша». */
  withNiche?: boolean;
  submitLabel?: string;
  className?: string;
}

export function LeadForm({
  formId,
  withNiche = true,
  submitLabel = "Отримати макет",
  className = "",
}: Props) {
  // Час показу форми. Пишемо в ефекті, а не при рендері — Date.now() нечистий.
  const openedAt = useRef(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const [values, setValues] = useState<LeadValues>(EMPTY);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  const set = (field: keyof LeadValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    // Помилку прибираємо одразу, щойно людина почала виправляти.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFailed(null);

    const found = validateLead(values);
    if (hasErrors(found)) {
      setErrors(found);
      return;
    }

    setSubmitting(true);
    try {
      await submitLead(
        {
          name: values.name.trim(),
          contact: values.contact.trim(),
          niche: values.niche.trim() || undefined,
          form: formId,
        },
        values.website,
        openedAt.current,
      );
      trackLead(formId);
      gaLead(formId);
      setDone(true);
    } catch (err) {
      if (err instanceof LeadError && err.kind === "throttled") {
        setFailed("Заявку вже прийнято щойно — дублювати не потрібно. Якщо це помилка, напишіть у Telegram.");
      } else if (err instanceof LeadError && err.kind === "not-configured") {
        setFailed("Форма тимчасово недоступна. Напишіть, будь ласка, у Telegram — відповім одразу.");
      } else {
        setFailed("Не вдалося надіслати — схоже, проблема зі зв'язком. Спробуйте ще раз або напишіть у Telegram.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div
        className={`rounded-2xl border border-green-500/30 bg-green-500/[0.08] p-7 sm:p-8 ${className}`}
        role="status"
      >
        <p className="text-lg font-black text-white mb-2">Прийнято ✦</p>
        <p className="text-sm text-white/65 leading-relaxed">
          Зв&apos;яжусь із вами протягом дня й надішлю макет. Якщо зручніше говорити зараз —{" "}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4"
          >
            напишіть у Telegram
          </a>
          .
        </p>
      </div>
    );
  }

  const field =
    "w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white text-base placeholder:text-white/35 focus:border-white/40 focus:outline-none transition-colors";

  return (
    <form onSubmit={onSubmit} noValidate className={`flex flex-col gap-3 ${className}`}>
      {/* Ханіпот — прихований від людей, видимий для ботів. */}
      <div aria-hidden className="absolute w-px h-px -left-[9999px] overflow-hidden">
        <label htmlFor={`${formId}-website`}>Не заповнюйте це поле</label>
        <input
          id={`${formId}-website`}
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={set("website")}
        />
      </div>

      <div>
        <input
          type="text"
          autoComplete="name"
          placeholder="Як до вас звертатись"
          value={values.name}
          onChange={set("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          className={field}
        />
        {errors.name && (
          <p id={`${formId}-name-error`} className="mt-1.5 text-xs text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+380 ... або @username"
          value={values.contact}
          onChange={set("contact")}
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? `${formId}-contact-error` : undefined}
          className={field}
        />
        {errors.contact && (
          <p id={`${formId}-contact-error`} className="mt-1.5 text-xs text-red-400">
            {errors.contact}
          </p>
        )}
      </div>

      {withNiche && (
        <div>
          <input
            type="text"
            placeholder="Чим займаєтесь? Напр. салон, доставка, ремонт"
            value={values.niche}
            onChange={set("niche")}
            aria-invalid={!!errors.niche}
            className={field}
          />
          {errors.niche && (
            <p className="mt-1.5 text-xs text-red-400">{errors.niche}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 px-6 py-4 rounded-xl bg-white text-black text-base font-bold hover:bg-white/90 disabled:opacity-60 disabled:cursor-wait transition-colors"
      >
        {submitting ? "Надсилаю…" : `${submitLabel} →`}
      </button>

      {failed && (
        <p role="alert" className="text-xs text-red-400">
          {failed}{" "}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Telegram
          </a>
        </p>
      )}

      <p className="text-xs text-white/35 leading-relaxed">
        Відповідаю протягом дня. Без дзвінків-нагадувань і розсилок. Надсилаючи, ви
        погоджуєтесь із{" "}
        <Link href="/privacy/" className="underline underline-offset-4 hover:text-white/60 transition-colors">
          політикою конфіденційності
        </Link>
        .
      </p>
    </form>
  );
}
