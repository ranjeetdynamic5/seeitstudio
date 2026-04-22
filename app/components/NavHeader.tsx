import { getProductCategories, getTrainingCategories } from "@/lib/sanity/queries";
import Header from "./Header";

export default async function NavHeader() {
  const [categories, trainingCategories] = await Promise.all([
    getProductCategories(),
    getTrainingCategories(),
  ]);

  return <Header categories={categories} trainingCategories={trainingCategories} />;
}
