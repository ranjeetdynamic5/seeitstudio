import { getProductCategories, getTrainingCategories, getAllServices } from "@/lib/sanity/queries";
import Header from "./Header";

export default async function NavHeader() {
  const [categories, trainingCategories, services] = await Promise.all([
    getProductCategories(),
    getTrainingCategories(),
    getAllServices(),
  ]);

  return <Header categories={categories} trainingCategories={trainingCategories} services={services} />;
}
