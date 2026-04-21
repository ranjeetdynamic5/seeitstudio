import { getTrainingCategories } from "@/lib/sanity/queries";
import Header from "./Header";

export default async function NavHeader() {
  const trainingCategories = await getTrainingCategories();
  return <Header trainingCategories={trainingCategories} />;
}
