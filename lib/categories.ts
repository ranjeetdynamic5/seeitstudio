// Single source of truth for product categories.
// Used by: Navbar dropdown, Products page tabs.

export type ProductCategory = {
  /** Matches the `category` field on Product objects */
  id: string;
  /** Display label */
  label: string;
  /** URL query param value → /products?category=<value> */
  param: string;
  /** Short description shown in the Navbar dropdown */
  description: string;
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: "SketchUp",   label: "SketchUp",            param: "sketchup",   description: "Go, Pro, Studio & Trimble Connect" },
  { id: "Extensions", label: "SketchUp Extensions", param: "extensions", description: "Productivity plugins for SketchUp" },
  { id: "Rendering",  label: "Rendering Software",  param: "rendering",  description: "V-Ray, Enscape, D5 & more" },
  { id: "AI Tools",   label: "AI Tools",            param: "ai",         description: "AI-powered design tools" },
  { id: "Bundles",    label: "Bundles",              param: "bundles",    description: "Curated software bundles" },
  { id: "CAD",        label: "CAD Software",        param: "cad",        description: "ZWCAD, MoI 3D & more" },
];

/** Resolve a URL ?category= param back to a category id (or "all"). */
export function paramToCategoryId(param: string | null): string {
  if (!param) return "all";
  const match = PRODUCT_CATEGORIES.find((c) => c.param === param.toLowerCase());
  return match ? match.id : "all";
}

/** Build the href for a given category. */
export function categoryHref(param: string): string {
  return `/products?category=${param}`;
}
