import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import NavHeader from "@/app/components/NavHeader";
import Footer from "@/app/components/Footer";
import { getAllTrainings, getTrainingBySlug } from "@/lib/sanity/queries";
import EnquireButton from "./EnquireButton";
import EnrollButton from "./EnrollButton";

export async function generateStaticParams() {
  const trainings = await getAllTrainings();
  return trainings.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const training = await getTrainingBySlug(slug);
  if (!training) return {};
  return {
    title: `${training.title} | SeeIt Studio`,
    description: training.description,
  };
}

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "text-emerald-700 bg-emerald-50",
  Intermediate: "text-amber-700 bg-amber-50",
  Advanced: "text-rose-700 bg-rose-50",
  "All Levels": "text-blue-700 bg-blue-50",
};

export default async function TrainingDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const training = await getTrainingBySlug(slug);

  if (!training) notFound();

  return (
    <>
      <NavHeader />
      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">

        {/* ── Page header ── */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-6">
              <Link href="/" className="hover:text-[#0B0F19] transition-colors">Home</Link>
              <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <Link href="/training" className="hover:text-[#0B0F19] transition-colors">Training</Link>
              <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <span className="text-[#0B0F19] font-medium truncate max-w-[200px]">{training.title}</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div>
                {training.category && (
                  <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
                    {training.category?.title}
                  </p>
                )}
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19] mb-3">
                  {training.title}
                </h1>
                {training.level && (
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${LEVEL_COLORS[training.level] ?? "text-slate-700 bg-slate-100"}`}>
                    {training.level}
                  </span>
                )}
              </div>

              <div className="shrink-0 bg-[#0F172A] rounded-xl px-6 py-5 text-center min-w-[160px]">
                <p className="text-xs text-slate-400 mb-1">Price per person</p>
                {typeof training.price === "number" ? (
                  <p className="text-3xl font-bold text-white">£{training.price.toFixed(2)}</p>
                ) : (
                  <p className="text-base font-semibold text-slate-300">Contact for price</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">

          {/* Image */}
          {training.image && (
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
              <Image
                src={training.image}
                alt={training.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Meta */}
          {(training.duration || training.format || training.level) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                training.duration && { label: "Duration", value: training.duration },
                training.format  && { label: "Format",   value: training.format   },
                training.level   && { label: "Level",    value: training.level    },
              ]
                .filter(Boolean)
                .map((item) => {
                  const { label, value } = item as { label: string; value: string };
                  return (
                    <div key={label} className="bg-white border border-slate-200 rounded-xl px-5 py-4">
                      <p className="text-xs text-[#64748B] mb-1">{label}</p>
                      <p className="text-sm font-semibold text-[#0B0F19]">{value}</p>
                    </div>
                  );
                })}
            </div>
          )}

          {/* Description */}
          {training.description && (
            <div className="bg-white border border-slate-200 rounded-xl px-6 py-6">
              <h2 className="text-base font-semibold text-[#0B0F19] mb-3">About this course</h2>
              <p className="text-sm text-[#64748B] leading-relaxed">{training.description}</p>
            </div>
          )}

          {/* Inclusions */}
          <div className="bg-white border border-slate-200 rounded-xl px-6 py-6">
            <h2 className="text-base font-semibold text-[#0B0F19] mb-4">What&apos;s included</h2>
            <ul className="space-y-2.5">
              {[
                "Certified UK instructor",
                "Small group size for focused learning",
                "Certificate of completion",
                "Post-course support included",
                "Course materials provided",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-[#64748B]">
                  <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-[#0F172A] rounded-2xl px-6 py-8 sm:px-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Ready to book?</h2>
              <p className="text-sm text-slate-400">Contact us to confirm availability and reserve your place.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="tel:03331212187"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0F172A] bg-white rounded-lg hover:bg-slate-100 transition-colors"
              >
                0333 121 2187
              </a>
              <EnquireButton training={training} />
              <EnrollButton courseTitle={training.title} />
            </div>
          </div>

          <Link
            href="/training"
            className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#D9534F] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to all courses
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
