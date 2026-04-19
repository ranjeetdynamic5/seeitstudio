import { sanityClient } from "./client";
import type { SanityProduct, SanityCategory } from "./types";

// ─── ALL PRODUCTS ─────────────────────────────────────────────

const ALL_PRODUCTS_QUERY = `
  *[_type == "product"] | order(name asc) {
    _id,
    name,
    slug,
    price,
    description,
    badge,
    featured,
    "image": image.asset->url,
    category-> {
      _id,
      title,
      slug
    }
  }
`;

// ─── PRODUCT BY SLUG ─────────────────────────────────────────

const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    description,
    badge,
    featured,
    "image": image.asset->url,
    category-> {
      _id,
      title,
      slug
    }
  }
`;

// ─── CATEGORIES ──────────────────────────────────────────────

const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug
  }
`;

export async function getAllCategories(): Promise<SanityCategory[]> {
  try {
    return await sanityClient.fetch<SanityCategory[]>(ALL_CATEGORIES_QUERY);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// ─── FEATURED PRODUCTS ───────────────────────────────────────

const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && featured == true] | order(name asc) {
    _id,
    name,
    slug,
    price,
    description,
    badge,
    featured,
    "image": image.asset->url,
    category-> {
      _id,
      title,
      slug
    }
  }
`;

// ─── FETCH FUNCTIONS ─────────────────────────────────────────

export async function getFeaturedProducts(): Promise<SanityProduct[]> {
  try {
    return await sanityClient.fetch<SanityProduct[]>(FEATURED_PRODUCTS_QUERY);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function getAllProducts(): Promise<SanityProduct[]> {
  try {
    return await sanityClient.fetch<SanityProduct[]>(ALL_PRODUCTS_QUERY);
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
    return await sanityClient.fetch<SanityProduct | null>(
      PRODUCT_BY_SLUG_QUERY,
      { slug }
    );
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}