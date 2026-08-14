export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  liveUrl?: string;
  /** Ніша клієнта — підпис над кейсом на посадковій. */
  niche?: string;
  /** Формат «Задача / Рішення» для секції кейсів на /lp. */
  task?: string;
  solution?: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  budget: string;
  message: string;
}
