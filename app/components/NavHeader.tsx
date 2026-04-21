import { getAllCategories, getTrainingCategories } from "@/lib/sanity/queries";
import Header from "./Header";

export default async function NavHeader() {
  const [categories, trainingCategories] = await Promise.all([
    getAllCategories(),
    getTrainingCategories(),
  ]);

  return <Header categories={categories} trainingCategories={trainingCategories} />;
}
