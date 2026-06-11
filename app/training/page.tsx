import type { Metadata } from "next";
import { Suspense } from "react";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";
import { getTrainingCourses, getTrainingCategories } from "@/lib/supabase";
import TrainingCatalog from "./TrainingCatalog";

export const metadata: Metadata = {
  title: "Training Courses — SketchUp & Rendering Training UK | Seeit Studio",
  description:
    "Expert-led SketchUp, V-Ray, Enscape and AI training courses for architects and design professionals. Certified UK instructors, small group sizes, certificate included.",
  alternates: {
    canonical: "https://seeitstudio.com/training",
  },
  openGraph: {
    title: "Training Courses — SketchUp & Rendering Training UK | Seeit Studio",
    description:
      "Expert-led SketchUp, V-Ray, Enscape and AI training courses for architects and design professionals. Certified UK instructors, small group sizes, certificate included.",
    url: "https://seeitstudio.com/training",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default async function TrainingPage() {
  const [trainings, categories] = await Promise.all([
    getTrainingCourses(),
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