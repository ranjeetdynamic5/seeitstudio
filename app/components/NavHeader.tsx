import { getAllCategories } from "@/lib/sanity/queries";
import Header from "./Header";

export default async function NavHeader() {
  const categories = await getAllCategories();

  return <Header categories={categories} />;
}