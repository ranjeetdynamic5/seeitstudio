import { Suspense } from "react";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";
import { getTrainingCourses } from "@/lib/supabase";
import TrainingCatalog from "./TrainingCatalog";

export const metadata = {
  title: "Training Courses | SeeIt Studio",
  description:
    "Expert-led SketchUp, rendering and AI training courses for design professionals. Certified UK instructors.",
};

export default async function TrainingPage() {
  const trainings = await getTrainingCourses();

  return (
    <>
      <NavHeader />
      <Suspense fallback={null}>
        <TrainingCatalog trainings={trainings} />
      </Suspense>
      <Footer />
    </>
  );
}
