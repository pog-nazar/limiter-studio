export interface LeadValues {
  name: string;
  contact: string;
  niche: string;
  /** Ханіпот — у людини завжди порожній. */
  website: string;
}

export type LeadErrors = Partial<Record<keyof LeadValues, string>>;

/**
 * Ті самі правила, що були в zod-схемі. Власна перевірка замість бібліотеки:
 * форма з трьох полів не виправдовує 86 КБ gzip у бандлі.
 */
export function validateLead(values: LeadValues): LeadErrors {
  const errors: LeadErrors = {};

  const name = values.name.trim();
  if (name.length < 2) {
    errors.name = "Вкажіть, як до вас звертатись";
  } else if (name.length > 100) {
    errors.name = "Забагато символів";
  }

  const contact = values.contact.trim();
  if (contact.length < 5) {
    errors.contact = "Залиште телефон або нік у Telegram";
  } else if (contact.length > 100) {
    errors.contact = "Забагато символів";
  } else {
    const digits = contact.replace(/\D/g, "");
    const looksLikePhone = digits.length >= 5;
    const looksLikeTelegram = contact.startsWith("@");
    if (!looksLikePhone && !looksLikeTelegram) {
      errors.contact = "Схоже на помилку — перевірте номер або нік";
    }
  }

  if (values.niche.trim().length > 80) {
    errors.niche = "Забагато символів";
  }

  return errors;
}

export function hasErrors(errors: LeadErrors) {
  return Object.keys(errors).length > 0;
}
