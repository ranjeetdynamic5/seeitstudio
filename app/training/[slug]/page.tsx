import { notFound } from "next/navigation";
import Image from "next/image";
import NavHeader from "@/app/components/NavHeader";
import Footer from "@/app/components/Footer";
import { getAllTrainings, getTrainingBySlug } from "@/lib/sanity/queries";
import EnquireButton from "./EnquireButton";

// 🔥 Static params for dynamic routes
export async function generateStaticParams() {
  const trainings = await getAllTrainings();

  return trainings.map((t) => ({
    slug: t.slug,
  }));
}

// 🔥 SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const training = await getTrainingBySlug(params.slug);

  if (!training) return {};

  return {
    title: `${training.title} | SeeIt Studio`,
    description: training.description,
  };
}

// 🔥 Main Page
export default async function TrainingDetail({
  params,
}: {
  params: { slug: string };
}) {
  const training = await getTrainingBySlug(params.slug);

  if (!training) return notFound();

  return (
    <>
      <NavHeader />

      <main className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Image */}
          {training.image && (
            <Image
              src={training.image}
              alt={training.title}
              width={600}
              height={400}
              className="rounded-xl"
            />
          )}

          {/* Content */}
          <div>
            <h1 className="text-3xl font-bold mb-4">
              {training.title}
            </h1>

            <p className="mb-4 text-gray-600">
              {training.description}
            </p>

            <p className="mb-2">
              <strong>Duration:</strong> {training.duration}
            </p>

            <p className="mb-6">
              <strong>Price:</strong> ₹{training.price}
            </p>

            {/* Enquiry Button */}
            <EnquireButton training={training} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}