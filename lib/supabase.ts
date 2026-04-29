import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type ProductCategory = {
  id: number;
  name: string;
  slug: string;
};

export type TrainingCategory = {
  id: number;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  original_price?: number;
  discount_percent?: number;
  is_on_sale?: boolean;
  offer_text?: string;
  image_url?: string;
  category_id?: number;
  created_at: string;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  image_url?: string;
  created_at: string;
};

export type TrainingCourse = {
  id: string;
  title: string;
  description: string;
  duration?: string;
  category_id?: number;
  created_at: string;
};

export async function getProductCategories(): Promise<ProductCategory[]> {
  const { data, error } = await supabase
    .from("product_categories")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error("Error fetching product categories:", error);
    return [];
  }
  return data ?? [];
}

export async function getTrainingCategories(): Promise<TrainingCategory[]> {
  const { data, error } = await supabase
    .from("training_categories")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error("Error fetching training categories:", error);
    return [];
  }
  return data ?? [];
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("title");
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data ?? [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return data;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);
  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
  return data ?? [];
}

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }
  return data ?? [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    console.error("Error fetching service:", error);
    return null;
  }
  return data;
}

export async function getTrainingCourses(): Promise<TrainingCourse[]> {
  const { data, error } = await supabase
    .from("training_courses")
    .select("*")
    .order("title");
  if (error) {
    console.error("Error fetching training courses:", error);
    return [];
  }
  return data ?? [];
}

export async function getTrainingById(id: string): Promise<TrainingCourse | null> {
  const { data, error } = await supabase
    .from("training_courses")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching training course:", error);
    return null;
  }
  return data;
}

export type Order = {
  id: string;
  order_id: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: "pending" | "completed";
  created_at: string;
};
