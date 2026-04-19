export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: "modelling" | "ai" | "web";
  features: string[];
  problems: string[];
  cta: string;
};

export const SERVICES: Service[] = [
  {
    slug: "3d-modelling",
    title: "3D Modelling",
    shortDescription: "Accurate and production-ready 3D models for architecture and products.",
    description:
      "We build clean, optimised 3D models from your drawings, sketches, or CAD files. Our models are structured for rendering, animation, or direct handoff to fabricators and manufacturers.",
    icon: "modelling",
    features: [
      "Architectural modelling from plans",
      "Product & furniture modelling",
      "CAD to 3D conversion",
      "Optimised topology for rendering & BIM",
      "SketchUp, Revit, and Rhino formats",
    ],
    problems: [
      "Poor model accuracy causing downstream errors",
      "Slow in-house modelling workflow",
      "Unoptimised files that crash software",
      "Inconsistent file structure across the team",
    ],
    cta: "Request a Quote",
  },
  {
    slug: "ai-consulting",
    title: "AI Consulting",
    shortDescription: "Smart automation and AI solutions for modern design businesses.",
    description:
      "We help architecture and design studios identify where AI and automation can save time, reduce cost, and improve output quality. From custom tools to workflow integration, we handle the technical side.",
    icon: "ai",
    features: [
      "Workflow automation audit & setup",
      "Custom AI tools for your team",
      "Chatbots & client-facing assistants",
      "AI-assisted design research",
      "Ongoing support & iteration",
    ],
    problems: [
      "Manual repetitive tasks eating into billable hours",
      "No clear starting point for AI adoption",
      "Low team productivity on admin-heavy work",
      "Missed opportunities from slow client response times",
    ],
    cta: "Book a Strategy Call",
  },
  {
    slug: "web-development",
    title: "Web Development",
    shortDescription: "High-converting websites for architecture and design studios.",
    description:
      "We design and build fast, professional websites that showcase your work and generate leads. Built on modern frameworks with SEO baked in from the start.",
    icon: "web",
    features: [
      "Portfolio & studio websites",
      "SEO-optimised architecture",
      "Lead generation & contact systems",
      "Mobile-first responsive design",
      "CMS integration for self-managed content",
    ],
    problems: [
      "Poor website performance hurting search rankings",
      "Low enquiry conversion from existing traffic",
      "Outdated design that doesn't reflect studio quality",
      "No control over content updates",
    ],
    cta: "Get a Quote",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
