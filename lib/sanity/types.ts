export type SanityCategory = {
  _id: string;
  title: string;
  slug: { current: string };
};

export type SanityProduct = {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  description: string;
  badge?: string;
  featured: boolean;
  /** Resolved image URL from the CDN */
  image?: string;
  category: SanityCategory;
};
