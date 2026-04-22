export type SanityCategory = {
  _id: string;
  title: string;
  slug: string;
};

export type SanityTrainingCategory = {
  title: string;
  slug: string;
};

export type SanityTraining = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  category?: SanityTrainingCategory;
  duration?: string;
  format?: "Online" | "In-Person" | "Hybrid";
  level?: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  price?: number;
  featured?: boolean;
  image?: string;
};

export type SanityService = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  features?: string[];
  problems?: string[];
  cta?: string;
  icon?: string;
  image?: string;
  category?: { title: string; slug: string };
};

export type SanityProduct = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  badge?: string;
  featured: boolean;
  /** Resolved image URL from the CDN */
  image?: string;
  category: SanityCategory;
};
