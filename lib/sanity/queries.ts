import { sanityClient } from "./client";
import type {
  SanityProduct,
  SanityCategory,
  SanityTraining,
  SanityTrainingCategory,
} from "./types";

// ─── ALL PRODUCTS ─────────────────────────────────────────────

const ALL_PRODUCTS_QUERY = `
  *[_type == "product"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    price,
    description,
    badge,
    featured,
    "image": image.asset->url,
    "category": category->{
      _id,
      title,
      "slug": slug.current
    }
  }
`;

// ─── PRODUCT BY SLUG ─────────────────────────────────────────

const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    price,
    description,
    badge,
    featured,
    "image": image.asset->url,
    "category": category->{
      _id,
      title,
      "slug": slug.current
    }
  }
`;

// ─── CATEGORIES ──────────────────────────────────────────────

const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`;

// ─── FEATURED PRODUCTS ───────────────────────────────────────

const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && featured == true] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    price,
    description,
    badge,
    featured,
    "image": image.asset->url,
    "category": category->{
      _id,
      title,
      "slug": slug.current
    }
  }
`;

// ─── FETCH FUNCTIONS ─────────────────────────────────────────

const options = { next: { revalidate: 0 } };

export async function getAllCategories(): Promise<SanityCategory[]> {
  try {
    return await sanityClient.fetch(ALL_CATEGORIES_QUERY, {}, options);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getFeaturedProducts(): Promise<SanityProduct[]> {
  try {
    return await sanityClient.fetch(FEATURED_PRODUCTS_QUERY, {}, options);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function getAllProducts(): Promise<SanityProduct[]> {
  try {
    return await sanityClient.fetch(ALL_PRODUCTS_QUERY, {}, options);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductBySlug(
  slug: string
): Promise<SanityProduct | null> {
  if (!slug) return null;

  try {
    return await sanityClient.fetch(
      PRODUCT_BY_SLUG_QUERY,
      { slug },
      options
    );
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

// ─── TRAINING ────────────────────────────────────────────────

// 🔥 FIXED: category properly dereferenced + safe structure
const TRAINING_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  description,
  duration,
  format,
  level,
  price,
  featured,
  "image": image.asset->url,
  "category": category->{
    _id,
    title,
    "slug": slug.current
  }
`;

const ALL_TRAININGS_QUERY = `
  *[_type == "training"] | order(title asc) {
    ${TRAINING_PROJECTION}
  }
`;

const TRAINING_BY_SLUG_QUERY = `
  *[_type == "training" && slug.current == $slug][0] {
    ${TRAINING_PROJECTION}
  }
`;

const FEATURED_TRAININGS_QUERY = `
  *[_type == "training" && featured == true] | order(title asc) {
    ${TRAINING_PROJECTION}
  }
`;

const TRAINING_CATEGORIES_QUERY = `
  *[_type == "category" && count(*[_type == "training" && references(^._id)]) > 0] | order(title asc) {
    title,
    "slug": slug.current
  }
`;

export async function getAllTrainings(): Promise<SanityTraining[]> {
  try {
    return await sanityClient.fetch(ALL_TRAININGS_QUERY, {}, options);
  } catch (error) {
    console.error("Error fetching trainings:", error);
    return [];
  }
}

export async function getFeaturedTrainings(): Promise<SanityTraining[]> {
  try {
    return await sanityClient.fetch(FEATURED_TRAININGS_QUERY, {}, options);
  } catch (error) {
    console.error("Error fetching featured trainings:", error);
    return [];
  }
}

export async function getTrainingCategories(): Promise<SanityTrainingCategory[]> {
  try {
    const results = await sanityClient.fetch(TRAINING_CATEGORIES_QUERY, {}, options);
    console.log("Training categories:", results);
    return results;
  } catch (error) {
    console.error("Error fetching training categories:", error);
    return [];
  }
}

export async function getTrainingBySlug(
  slug: string
): Promise<SanityTraining | null> {
  if (!slug) return null;

  try {
    return await sanityClient.fetch(
      TRAINING_BY_SLUG_QUERY,
      { slug },
      options
    );
  } catch (error) {
    console.error("Error fetching training by slug:", error);
    return null;
  }
}