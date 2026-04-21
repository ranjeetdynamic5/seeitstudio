import { Suspense } from "react";
import NavHeader from "@/app/components/NavHeader";
import Footer from "@/app/components/Footer";
import { getAllTrainings, getTrainingCategories } from "@/lib/sanity/queries";
import TrainingCatalog from "./TrainingCatalog";

export const metadata = {
  title: "Training Courses | SeeIt Studio",
  description:
    "Expert-led SketchUp, rendering and AI training courses for design professionals. Certified UK instructors.",
};

export default async function TrainingPage() {
  const [trainings, categories] = await Promise.all([
    getAllTrainings(),
    getTrainingCategories(),
  ]);

  return (
    <>
      <NavHeader />
      <Suspense fallback={null}>
        <TrainingCatalog trainings={trainings} categories={categories} />
      </Suspense>
      <Footer />
    </>
  );
}
