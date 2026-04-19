import Link from "next/link";
import NavHeader from "@/app/components/NavHeader";
import Footer from "@/app/components/Footer";

// ── Data ──────────────────────────────────────────────────────────────────────

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description?: string;
  type: "upcoming" | "past";
  format: "Online" | "In-Person" | "Hybrid";
};

const EVENTS: Event[] = [
  {
    id: "sketchup-day-2026-may",
    title: "SketchUp for Beginners — Live Workshop",
    date: "2026-05-14",
    location: "Online (Zoom)",
    description:
      "A hands-on full-day session covering SketchUp fundamentals — navigation, push-pull geometry, groups, and components. Ideal for those new to 3D modelling.",
    type: "upcoming",
    format: "Online",
  },
  {
    id: "vray-essentials-june",
    title: "V-Ray Essentials: Lighting & Materials",
    date: "2026-06-04",
    location: "Online (Zoom)",
    description:
      "Learn how to set up accurate lighting, create believable materials, and produce client-ready renders using V-Ray for SketchUp.",
    type: "upcoming",
    format: "Online",
  },
  {
    id: "ai-design-studio-june",
    title: "AI for Design Studios — Strategy Session",
    date: "2026-06-18",
    location: "Manchester, UK",
    description:
      "A half-day in-person session exploring how architecture and design studios can adopt AI tools to improve workflow, client communication, and output quality.",
    type: "upcoming",
    format: "In-Person",
  },
  {
    id: "layout-workshop-july",
    title: "LayOut for Construction Documents",
    date: "2026-07-09",
    location: "Online (Zoom)",
    description:
      "Produce professional 2D drawings from your SketchUp models. Covers viewports, dimensions, title blocks, and PDF export.",
    type: "upcoming",
    format: "Online",
  },
  {
    id: "sketchup-advanced-march",
    title: "SketchUp Pro: Advanced Modelling",
    date: "2026-03-12",
    location: "Online (Zoom)",
    type: "past",
    format: "Online",
  },
  {
    id: "d5-render-feb",
    title: "D5 Render: Real-Time Visualisation",
    date: "2026-02-19",
    location: "Online (Zoom)",
    type: "past",
    format: "Online",
  },
  {
    id: "extensions-masterclass-jan",
    title: "SketchUp Extensions Masterclass",
    date: "2026-01-22",
    location: "Online (Zoom)",
    type: "past",
    format: "Online",
  },
];

const FORMAT_COLORS: Record<Event["format"], string> = {
  Online: "text-blue-700 bg-blue-50",
  "In-Person": "text-emerald-700 bg-emerald-50",
  Hybrid: "text-amber-700 bg-amber-50",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function UpcomingCard({ event }: { event: Event }) {
  const [year, month, day] = event.date.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  const dayNum = d.toLocaleDateString("en-GB", { day: "numeric" });
  const monthStr = d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col sm:flex-row">

      {/* Date block */}
      <div className="bg-[#0F172A] flex flex-row sm:flex-col items-center justify-center gap-3 sm:gap-0 px-6 py-4 sm:py-6 sm:w-24 shrink-0">
        <span className="text-3xl sm:text-4xl font-bold text-white leading-none">{dayNum}</span>
        <span className="text-xs font-semibold text-[#D9534F] tracking-widest sm:mt-1">{monthStr}</span>
        <span className="text-xs text-slate-400 sm:mt-0.5 hidden sm:block">
          {d.getFullYear()}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-[#0B0F19] leading-snug">{event.title}</h3>
          <span className={`shrink-0 px-2.5 py-1 text-xs font-semibold rounded-full ${FORMAT_COLORS[event.format]}`}>
            {event.format}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {event.location}
        </div>

        {event.description && (
          <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2">{event.description}</p>
        )}

        <div className="mt-auto pt-3 border-t border-slate-100">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
          >
            Register Now
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

function PastCard({ event }: { event: Event }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4 opacity-75">
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#0B0F19] truncate">{event.title}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-[#64748B]">{formatDate(event.date)}</span>
          <span className="text-xs text-[#64748B]">·</span>
          <span className="text-xs text-[#64748B]">{event.location}</span>
        </div>
      </div>
      <span className="shrink-0 px-2.5 py-1 text-xs font-semibold text-slate-500 bg-slate-100 rounded-full">
        Completed
      </span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "Events & Workshops — SeeIt Studio",
  description:
    "Upcoming training workshops and events from SeeIt Studio — SketchUp, rendering, and design technology sessions for UK professionals.",
};

export default function EventsPage() {
  const upcoming = EVENTS.filter((e) => e.type === "upcoming").sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const past = EVENTS.filter((e) => e.type === "past").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <NavHeader />

      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">

        {/* ── Page header ──────────────────────────────────────────────────── */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-4">
              <Link href="/" className="hover:text-[#0B0F19] transition-colors">Home</Link>
              <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <span className="text-[#0B0F19] font-medium">Events</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="max-w-xl">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
                  Events & Workshops
                </h1>
                <p className="mt-3 text-base text-[#64748B]">
                  Practical, hands-on sessions for design and architecture professionals. All events
                  are delivered by certified instructors with real-world experience.
                </p>
              </div>
              <div className="text-sm text-[#64748B] shrink-0">
                <span className="font-semibold text-[#0B0F19]">{upcoming.length}</span> upcoming event{upcoming.length !== 1 ? "s" : ""}
              </div>
            </div>

            {/* Trust bar */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {[
                "Certified UK instructors",
                "Small group sizes",
                "Certificate of attendance",
                "Post-event support included",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-[#64748B]">
                  <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col gap-14">

          {/* ── Upcoming events ─────────────────────────────────────────────── */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0B0F19] tracking-tight">Upcoming Events</h2>
              <span className="px-3 py-1 text-xs font-semibold text-[#D9534F] bg-rose-50 rounded-full">
                {upcoming.length} scheduled
              </span>
            </div>

            {upcoming.length > 0 ? (
              <div className="flex flex-col gap-4">
                {upcoming.map((event) => (
                  <UpcomingCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl py-16 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[#0B0F19]">No upcoming events scheduled</p>
                <p className="text-sm text-[#64748B]">Check back soon or contact us to arrange a private session.</p>
              </div>
            )}
          </section>

          {/* ── Past events ─────────────────────────────────────────────────── */}
          {past.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-[#0B0F19] tracking-tight mb-6">Past Events</h2>
              <div className="flex flex-col gap-3">
                {past.map((event) => (
                  <PastCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

        </div>

        {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-[#0F172A] rounded-2xl px-6 py-10 sm:px-10 sm:py-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
                Private & group sessions
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Want to join our next event?
              </h2>
              <p className="text-sm text-slate-400 max-w-md">
                We also run private workshops for studios and teams. Get in touch to discuss a
                tailored session for your organisation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="tel:03331212187"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0F172A] bg-white rounded-lg hover:bg-slate-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                0333 121 2187
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
