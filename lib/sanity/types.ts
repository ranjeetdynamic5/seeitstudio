export type SanityCategory = {
  _id: string;
  title: string;
  slug: string;
};

export type SanityTrainingCategory = {
  label: string;
  slug: string;
};

export type SanityTraining = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  category?: string;
  duration?: string;
  format?: "Online" | "In-Person" | "Hybrid";
  level?: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  price?: number;
  featured?: boolean;
  image?: string;
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
