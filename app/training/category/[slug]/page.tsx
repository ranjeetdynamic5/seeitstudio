import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NavHeader from "@/app/components/NavHeader";
import Footer from "@/app/components/Footer";
import { getAllTrainings, getTrainingCategories } from "@/lib/sanity/queries";
import TrainingCatalog from "../../TrainingCatalog";

export async function generateStaticParams() {
  const categories = await getTrainingCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getTrainingCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.title} Training | SeeIt Studio`,
    description: `Expert-led ${category.title} training courses for design professionals. Certified UK instructors.`,
  };
}

export default async function TrainingCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [trainings, categories] = await Promise.all([
    getAllTrainings(),
    getTrainingCategories(),
  ]);

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <>
      <NavHeader />
      <Suspense fallback={null}>
        <TrainingCatalog
          trainings={trainings}
          categories={categories}
          initialCategory={slug}
        />
      </Suspense>
      <Footer />
    </>
  );
}
