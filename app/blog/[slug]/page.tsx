import { notFound } from "next/navigation";
import Link from "next/link";
import NavHeader from "@/app/components/NavHeader";
import Footer from "@/app/components/Footer";

// ── Types & data ──────────────────────────────────────────────────────────────

type Category = "SketchUp" | "Rendering" | "AI" | "Web Design";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: string;
  author: string;
  content: React.ReactNode;
};

const CATEGORY_COLORS: Record<Category, string> = {
  SketchUp: "text-blue-700 bg-blue-50",
  Rendering: "text-amber-700 bg-amber-50",
  AI: "text-violet-700 bg-violet-50",
  "Web Design": "text-emerald-700 bg-emerald-50",
};

const HERO_GRADIENT: Record<Category, string> = {
  SketchUp: "from-blue-900 via-slate-800 to-slate-900",
  Rendering: "from-amber-900 via-slate-800 to-slate-900",
  AI: "from-violet-900 via-slate-800 to-slate-900",
  "Web Design": "from-emerald-900 via-slate-800 to-slate-900",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── Mock post content ─────────────────────────────────────────────────────────

const POSTS: Post[] = [
  {
    slug: "sketchup-tips-for-architects",
    title: "10 SketchUp Tips Every Architect Should Know",
    excerpt:
      "From component libraries to section planes, these workflow shortcuts will save you hours on every project.",
    category: "SketchUp",
    date: "2026-03-28",
    readTime: "5 min read",
    author: "James Ogston",
    content: (
      <>
        <p>SketchUp has become the go-to 3D modelling tool for architects and interior designers across the UK — and for good reason. It&apos;s fast, intuitive, and powerful enough for everything from concept sketches to detailed construction documents. But even experienced users often miss features that could save them hours every week.</p>
        <p>Here are ten tips that consistently make the biggest difference in real-world project workflows.</p>
        <h2>1. Build a shared component library</h2>
        <p>Custom components — furniture, doors, windows, site elements — should be saved to a shared network folder, not buried inside individual model files. Use <strong>File &gt; Save As</strong> to export components directly, and organise them by category. Your whole team benefits, and models stay lightweight.</p>
        <h2>2. Use groups and components consistently</h2>
        <p>Everything in your model should be either a group or a component. Raw geometry bleeds into adjacent faces and causes modelling chaos. Group structural elements immediately on creation, and convert anything you&apos;ll reuse into a component.</p>
        <h2>3. Master section planes</h2>
        <p>Section planes are underused. You can add them via <strong>Tools &gt; Section Plane</strong>, and crucially, you can have multiple section planes in a scene — just activate the one you need. Save different section cuts as scenes for instant switching during client presentations.</p>
        <h2>4. Name every scene</h2>
        <p>Unnamed scenes labelled &ldquo;Scene 1, Scene 2&rdquo; are a maintenance problem. Name every scene descriptively — &ldquo;Ground Floor Plan&rdquo;, &ldquo;South Elevation&rdquo;, &ldquo;3D Overview&rdquo;. It costs five seconds and saves significant confusion when handing files to colleagues or sending to LayOut.</p>
        <h2>5. Use the Outliner panel for complex models</h2>
        <p>Once a model reaches a certain size, navigating by clicking becomes slow. The Outliner (<strong>Window &gt; Outliner</strong>) gives you a tree view of all groups and components. You can select, hide, and lock elements directly from here without having to find them in the viewport.</p>
        <h2>6. Work in parallel projection for elevations</h2>
        <p>Perspective is great for 3D views, but switch to <strong>Camera &gt; Parallel Projection</strong> when producing elevations and plans. It eliminates distortion and produces drawings that are accurate for LayOut and planning submissions.</p>
        <h2>7. Purge unused regularly</h2>
        <p>Imported models and abandoned components bloat file size. Use <strong>Window &gt; Model Info &gt; Statistics &gt; Purge Unused</strong> regularly during a project. Files can shrink dramatically — sometimes from 200MB to under 30MB — with no visual change.</p>
        <h2>8. Set up keyboard shortcuts for the tools you use most</h2>
        <p>SketchUp supports full keyboard shortcut customisation. Go to <strong>Window &gt; Preferences &gt; Shortcuts</strong> and assign single keys to your most-used tools. Most experienced users run SketchUp with minimal toolbar use and near-instant tool switching.</p>
        <h2>9. Use tags (formerly layers) for visibility control only</h2>
        <p>A common mistake is assigning raw geometry to tags. Geometry should always live on the Untagged layer. Only assign groups and components to tags — this is how SketchUp is designed to work, and it prevents a large category of modelling errors.</p>
        <h2>10. Save scenes before sending to LayOut</h2>
        <p>LayOut pulls scenes directly from your SketchUp file. Any viewport you want to reference in a drawing should exist as a named scene before you open LayOut. Retroactively adding scenes mid-document causes viewport drift and wastes significant time.</p>
        <p>These habits might seem small individually, but applied consistently they compound into a materially faster and more reliable workflow. If you want to go deeper on any of them, our <strong>SketchUp Pro: Advanced Modelling</strong> training course covers all of these and more in a structured, hands-on format.</p>
      </>
    ),
  },
  {
    slug: "vray-lighting-guide",
    title: "A Practical Guide to V-Ray Lighting in SketchUp",
    excerpt:
      "Natural light, artificial sources, and HDRI environments — learn how to set up lighting that makes your renders look convincing.",
    category: "Rendering",
    date: "2026-03-14",
    readTime: "7 min read",
    author: "James Ogston",
    content: (
      <>
        <p>Lighting is the single most important factor in whether a render looks convincing. You can have detailed geometry and accurate materials, but poor lighting will flatten the result and make it look immediately artificial. Get lighting right, and even simple models can produce compelling images.</p>
        <p>This guide covers the three main lighting approaches in V-Ray for SketchUp, and when to use each.</p>
        <h2>Understanding the V-Ray lighting workflow</h2>
        <p>V-Ray uses physically-based lighting, which means light behaves according to real-world rules. Intensity is measured in meaningful units (lux, lumens, temperature), and light falls off naturally over distance. This is what makes V-Ray output look plausible — but it also means you need to think about lighting the way a photographer or cinematographer would.</p>
        <h2>Natural light: Sun and Sky</h2>
        <p>The V-Ray Sun and Sky system is the fastest route to a convincing exterior render. Enable it through the Lights toolbar and set your geographic location and time of day. The system automatically adjusts colour temperature — warm morning light, neutral midday, golden late afternoon.</p>
        <p>For exterior renders, this alone is often sufficient. The key variable is the <strong>Turbidity</strong> setting, which controls atmospheric haze. Low values (2–3) give crisp, clear-day light. Higher values (6–8) produce the softer, slightly overcast quality that often works better for architectural photography.</p>
        <h2>HDRI environments</h2>
        <p>For interior renders where you want realistic ambient light coming through windows, or for product shots where you need controlled reflections, HDRI environments are the better choice. A single high-dynamic-range image provides both illumination and background.</p>
        <p>In V-Ray&apos;s Asset Editor, go to <strong>Lights &gt; Dome Light</strong> and assign your HDRI. Rotate it to position the primary light source correctly relative to your model. The quality of the HDRI matters significantly — a low-resolution or poorly-captured image will produce flat, unconvincing light.</p>
        <h2>Artificial lighting: IES and rectangle lights</h2>
        <p>For interior scenes, you&apos;ll typically use a combination of natural light and artificial sources. V-Ray supports IES files (real photometric data from lighting manufacturers), which reproduce the exact spread and intensity of specific fittings.</p>
        <p>Download IES files from the manufacturer&apos;s website, load them as IES lights in V-Ray, and position them inside your fitting geometry. The difference in realism compared to generic point lights is significant.</p>
        <p>For softer fill light — ceiling panels, strip lighting — use rectangle lights with the correct dimensions and a physically accurate lumen value.</p>
        <h2>Common mistakes</h2>
        <p><strong>Overexposure:</strong> V-Ray renders to physical exposure. If your image is too bright, adjust the camera exposure (ISO, f-stop, shutter speed) rather than reducing light intensity — this mirrors how a real camera works.</p>
        <p><strong>Missing bounce light:</strong> Ensure Global Illumination is enabled. Without it, shadows are unnaturally dark and surfaces lack the secondary illumination that makes spaces look inhabited.</p>
        <p><strong>Inconsistent colour temperature:</strong> Mixing a 6500K daylight environment with 2700K interior spots creates a realistic tension; mixing randomly produces an incoherent result. Be deliberate about temperature choices.</p>
        <p>Lighting is a discipline that improves with practice and observation. Study architectural photography, pay attention to how light behaves in real spaces, and apply those observations systematically in V-Ray.</p>
      </>
    ),
  },
  {
    slug: "ai-tools-for-design-studios",
    title: "How Design Studios Are Using AI in 2026",
    excerpt:
      "From automated briefs to generative concept sketches, here's how forward-thinking studios are integrating AI into their workflows.",
    category: "AI",
    date: "2026-02-27",
    readTime: "6 min read",
    author: "James Ogston",
    content: (
      <>
        <p>Eighteen months ago, AI in architecture was mostly a conference topic. In 2026, it&apos;s a practical tool that a growing number of UK studios are using every week — not to replace designers, but to compress the time spent on tasks that don&apos;t require design judgement.</p>
        <p>Here&apos;s a realistic picture of how it&apos;s being used, and where the genuine value lies.</p>
        <h2>Brief writing and documentation</h2>
        <p>Language models have made the most immediate impact on written output. Briefing documents, planning statements, specification notes, client update emails — these are time-consuming to write from scratch, but straightforward to produce with AI assistance when you provide the relevant facts and context.</p>
        <p>The key discipline is treating AI output as a first draft, not a final one. The studio&apos;s voice, technical accuracy, and client-specific nuance still require human review. But the time saving from not starting from a blank page is real and consistent.</p>
        <h2>Concept image generation</h2>
        <p>Image generation tools (Midjourney, Adobe Firefly, and others) are now being used at the earliest stages of a project to produce visual mood references — not architectural drawings, but atmosphere studies that help align client expectations before detailed design work begins.</p>
        <p>This is a genuine improvement on the previous workflow of assembling Pinterest boards. A generated image can synthesise multiple references into a single coherent visual direction, and the conversation it prompts with clients tends to be more productive.</p>
        <h2>Code and automation</h2>
        <p>For studios with technical staff, AI coding assistants have compressed the time required to build custom tools — spreadsheet automations, SketchUp Ruby scripts, simple internal web apps. Tasks that previously required a developer or were simply not worth the time are now feasible with AI-assisted development.</p>
        <h2>Client communication</h2>
        <p>Some studios are experimenting with AI chatbots on their websites — not to replace human response, but to handle initial enquiries outside business hours, gather project information, and qualify leads before they reach a principal. The quality of these implementations varies considerably, but the better ones are producing measurable improvements in response time and enquiry conversion.</p>
        <h2>What AI doesn&apos;t do</h2>
        <p>It&apos;s worth being direct about the limits. AI does not produce good architectural drawings. It does not understand building regulations, structural constraints, or site-specific conditions. It cannot replace the judgement required to resolve a complex brief or manage a client relationship through a difficult project.</p>
        <p>The studios getting value from AI are using it to handle the lower-order tasks that consume time without requiring design expertise — and using the time saved to do more of the work that does.</p>
      </>
    ),
  },
  {
    slug: "sketchup-layout-construction-docs",
    title: "Using LayOut to Produce Professional Construction Documents",
    excerpt:
      "LayOut is one of SketchUp's most underused tools. This guide walks through how to produce clean, dimensioned drawings for planning and construction.",
    category: "SketchUp",
    date: "2026-02-12",
    readTime: "8 min read",
    author: "James Ogston",
    content: (
      <>
        <p>LayOut is bundled with SketchUp Pro and is capable of producing professional 2D drawing sets directly from your 3D model. Despite this, many SketchUp users either don&apos;t use it, or use it poorly — falling back on AutoCAD or manual drafting for their 2D output.</p>
        <p>This guide covers the core workflow for producing clean, dimensioned construction documents in LayOut.</p>
        <h2>Setting up your SketchUp file correctly</h2>
        <p>LayOut pulls scenes from your SketchUp file, so the quality of your LayOut output depends on the quality of your scene setup. Before opening LayOut, you should have named scenes for every view you need: floor plans (section planes + top-down camera), elevations (parallel projection), 3D overviews, and any detail views.</p>
        <p>Use tags to control visibility per scene — structure on one tag, furniture on another, annotations on another. This lets you show clean structural drawings in one viewport and furnished layouts in another, all from the same model.</p>
        <h2>Creating a document template</h2>
        <p>LayOut supports custom document templates. Set up your title block, border, and standard text styles once and save as a template. Every subsequent project starts from this baseline, which is far more efficient than reformatting each time.</p>
        <p>Set your page size to match your output requirement — A1 for detailed drawings, A3 for planning packs. Establish a consistent grid for placing viewports.</p>
        <h2>Inserting and configuring viewports</h2>
        <p>Insert a SketchUp viewport via <strong>File &gt; Insert</strong>. Select your scene from the SketchUp Model panel on the right. Set the scale precisely — 1:50 for floor plans, 1:100 for site plans — and lock the viewport so it can&apos;t be accidentally moved or rescaled.</p>
        <p>Critical: set viewports to <strong>Vector rendering</strong> for clean line output, not raster. This produces crisp, scalable line work rather than a screenshot.</p>
        <h2>Dimensioning</h2>
        <p>LayOut&apos;s dimension tool reads the actual geometry of your SketchUp model — dimensions are accurate and update automatically when the model changes. Use the dimension style panel to match your practice&apos;s standard annotation conventions.</p>
        <h2>Text and labels</h2>
        <p>Use LayOut&apos;s text tools for all annotations. Set up paragraph styles for headings, notes, and labels, and apply them consistently. Avoid adding text directly in SketchUp unless you specifically need 3D text.</p>
        <h2>Updating from the model</h2>
        <p>When your SketchUp model changes, update all viewports via <strong>File &gt; Document Setup &gt; References &gt; Update</strong>. Dimensions and annotations remain in place; only the geometry updates. This is the core advantage of LayOut over a static export workflow.</p>
        <p>A well-structured LayOut workflow produces planning and construction documents that update with the model, maintain accuracy, and require no manual redrawing. The upfront investment in template setup pays back quickly across a project.</p>
      </>
    ),
  },
  {
    slug: "d5-render-vs-enscape",
    title: "D5 Render vs Enscape: Which Is Right for Your Studio?",
    excerpt:
      "Both are real-time rendering tools, but they suit different workflows. We compare features, speed, and output quality to help you decide.",
    category: "Rendering",
    date: "2026-01-30",
    readTime: "5 min read",
    author: "James Ogston",
    content: (
      <>
        <p>D5 Render and Enscape occupy the same general category — real-time architectural rendering with direct SketchUp integration — but they suit different workflows and priorities. This comparison is based on practical use in live project environments.</p>
        <h2>Enscape: speed and simplicity</h2>
        <p>Enscape runs as a plugin within SketchUp (and Revit, Rhino, ArchiCAD). Open it and you have an instant, live preview of your model in a rendered environment. Changes in SketchUp appear in Enscape within seconds.</p>
        <p>It&apos;s the fastest route from model to client-presentable visual. The interface is minimal, the learning curve is short, and the output is consistently good for its effort level. For studios that need to produce visuals quickly in a client meeting or during a design review, Enscape is difficult to beat.</p>
        <p>The limitation is control. Enscape automates a great deal — lighting, sky, exposure — which means fast results but less ability to produce highly specific looks without workarounds.</p>
        <h2>D5 Render: quality and control</h2>
        <p>D5 Render is a standalone application with a live sync plugin for SketchUp. Models update in real time, but D5 has its own scene setup, asset library, material editor, and lighting controls.</p>
        <p>The output ceiling is higher than Enscape. With proper scene setup, D5 produces images that are difficult to distinguish from V-Ray renders in a fraction of the time. The asset library is substantial — trees, furniture, people, vehicles — and the particle and weather systems add a level of atmosphere that Enscape currently doesn&apos;t match.</p>
        <p>The trade-off is the additional setup time. D5 requires more deliberate scene construction and a steeper learning curve.</p>
        <h2>Which should you choose?</h2>
        <p><strong>Choose Enscape if:</strong> you primarily need fast, good-quality visuals produced quickly and consistently, especially within a live design process. It&apos;s also the better choice for VR walkthroughs.</p>
        <p><strong>Choose D5 if:</strong> image quality is the priority, you produce high-resolution stills for marketing or planning purposes, and you have time to invest in scene setup.</p>
        <p>Some studios run both — Enscape for live design reviews and quick client updates, D5 for final presentation imagery. Both are available on subscription and trial licences, so testing them on a real project is the most reliable way to decide.</p>
      </>
    ),
  },
  {
    slug: "website-for-architecture-studio",
    title: "What Makes a Great Architecture Studio Website in 2026",
    excerpt:
      "Portfolio presentation, load speed, and enquiry conversion — the benchmarks that separate effective studio websites from average ones.",
    category: "Web Design",
    date: "2026-01-15",
    readTime: "4 min read",
    author: "James Ogston",
    content: (
      <>
        <p>Most architecture studio websites are underperforming. The work is strong, the photography is professional, but the website fails at the things that actually drive business: loading quickly, explaining clearly what the studio does, and making it easy for the right clients to get in touch.</p>
        <p>Here&apos;s what separates effective studio websites from average ones in 2026.</p>
        <h2>Page speed is not optional</h2>
        <p>Architecture studios routinely publish websites with 20MB+ image loads and Core Web Vitals scores in the red. In an industry where the work is visual, this is understandable — but it&apos;s commercially damaging. Google reduces search visibility for slow pages, and clients on mobile leave before the images load.</p>
        <p>The fix is not complex: use modern image formats (WebP, AVIF), implement lazy loading, and choose a framework that serves optimised assets. A well-built Next.js or similar site can pass Core Web Vitals while still showing full-resolution photography.</p>
        <h2>Portfolio presentation</h2>
        <p>The portfolio should answer three questions quickly: what type of work does this studio do, what is the quality of that work, and is it relevant to my project? Most studio websites bury the answer to all three behind navigation and introductory text.</p>
        <p>Lead with images. Use project titles that communicate project type and scale. Provide enough written context to support the images, but don&apos;t prioritise writing over photography.</p>
        <h2>Clear service offering</h2>
        <p>Many studio websites are vague about what services they offer and who they work with. This is a missed opportunity. Clients are looking for evidence that you&apos;ve done similar work. Be explicit about project types, sectors, and geographic scope.</p>
        <h2>Enquiry conversion</h2>
        <p>A contact form alone is insufficient. The best-performing studio websites include a clear call to action on every project page, a phone number that&apos;s easy to find, and a brief process description that reduces friction for new clients who don&apos;t know how to start the conversation.</p>
        <p>If your website gets traffic but generates few enquiries, the issue is almost always the conversion path — not the work.</p>
      </>
    ),
  },
  {
    slug: "chatgpt-for-design-briefs",
    title: "Using ChatGPT to Write Better Design Briefs",
    excerpt:
      "AI won't replace the designer, but it can sharpen the brief. Here's a practical approach to using language models at the start of a project.",
    category: "AI",
    date: "2025-12-18",
    readTime: "4 min read",
    author: "James Ogston",
    content: (
      <>
        <p>A well-written design brief is one of the most valuable documents in a project. It aligns expectations, surfaces constraints early, and provides a reference point when scope questions arise later. It&apos;s also, in most studios, one of the documents that receives the least attention.</p>
        <p>Language models like ChatGPT are genuinely useful here — not to generate the brief autonomously, but to help structure, sharpen, and complete one from the information you already have.</p>
        <h2>What to give the AI</h2>
        <p>The quality of AI output depends entirely on the quality of input. Before asking for anything, compile: client name and background, project type and scale, site address and key constraints, budget range, programme, any specific client preferences or precedents mentioned, and the output format you need.</p>
        <p>This is the information you&apos;d gather in an initial client meeting. Feeding it to a language model as structured notes produces a usable first draft in seconds.</p>
        <h2>A practical prompt approach</h2>
        <p>Rather than asking for &ldquo;a brief&rdquo; generically, be specific: &ldquo;Write a project brief for a residential extension in Edinburgh. The client is a family of four requiring an open-plan kitchen-dining space and a fourth bedroom. Budget is £180–220k. The site has a north-facing garden. Use formal professional language suitable for planning submission.&rdquo;</p>
        <p>The more specific the prompt, the more useful the output.</p>
        <h2>Review and revise</h2>
        <p>Treat the AI output as a structural draft. Review it for technical accuracy, client-specific nuance, and tone. Add any constraints or requirements that weren&apos;t in the original notes. The revision process is faster than writing from scratch and tends to produce a more complete document — because the AI raises standard brief sections you might otherwise skip.</p>
        <h2>Where it doesn&apos;t help</h2>
        <p>AI cannot interpret a site visit, understand the specific dynamic of a client relationship, or make the judgement calls that experienced practitioners make instinctively. The brief it produces will be structurally competent but not yet design-informed. That part remains the architect&apos;s job.</p>
        <p>Used as a starting point rather than a finished product, language models make brief writing significantly faster and more consistent.</p>
      </>
    ),
  },
  {
    slug: "sketchup-extensions-workflow",
    title: "The Best SketchUp Extensions for a Faster Workflow",
    excerpt:
      "FlexTools, Skalp, and the mind.sight.studios pack can transform how quickly you work. Here's how to combine them effectively.",
    category: "SketchUp",
    date: "2025-11-22",
    readTime: "6 min read",
    author: "James Ogston",
    content: (
      <>
        <p>SketchUp&apos;s Extension Warehouse and third-party developers have produced a remarkable ecosystem of plugins. The challenge isn&apos;t finding extensions — it&apos;s identifying which ones are worth learning and how to combine them into a coherent workflow.</p>
        <p>These are the extensions we use consistently in professional practice and recommend in our training.</p>
        <h2>FlexTools</h2>
        <p>FlexTools is a parametric component system for SketchUp — primarily windows, doors, and wall openings. The components cut their own openings on insertion and update dynamically when you resize them. What would otherwise require manual geometry editing becomes a property change.</p>
        <p>For residential and commercial architecture work, FlexTools alone can reduce modelling time on fenestration and openings by 60–70%. It integrates with LayOut for door and window schedules.</p>
        <h2>Skalp</h2>
        <p>Skalp produces professional section fill patterns in SketchUp — hatch patterns for concrete, timber, insulation, masonry, and other materials. It works directly with section planes and exports correctly to LayOut.</p>
        <p>Before Skalp, producing hatched sections from SketchUp required either manual work in LayOut or export to AutoCAD. Skalp eliminates that step entirely and the output is considerably cleaner than hand-drawn hatching.</p>
        <h2>mind.sight.studios pack</h2>
        <p>The mind.sight.studios extension pack includes a range of tools for managing model complexity: tools for selecting by material, isolating groups, copying and distributing elements along paths, and working with edges and faces in bulk. These are the kinds of operations that SketchUp&apos;s native tools don&apos;t handle efficiently at scale.</p>
        <p>Individually, each tool seems minor. In combination, they significantly reduce the number of manual steps in common modelling operations.</p>
        <h2>Curic Section</h2>
        <p>Curic Section extends SketchUp&apos;s section plane tools with better control over section fills, the ability to create section-cut groups for further editing, and improved performance on large models. For complex sectional work, it&apos;s a more capable replacement for the native section tools.</p>
        <h2>How to combine them</h2>
        <p>The most effective approach is to learn one extension thoroughly before adding the next. FlexTools is the highest-impact starting point for architectural work. Add Skalp once your section workflow is established. The mind.sight.studios pack adds value when your models are complex enough to require bulk operations.</p>
        <p>Overloading your toolbar with extensions you haven&apos;t learned produces clutter without benefit. A small set of well-understood extensions outperforms a large set of partially-understood ones.</p>
      </>
    ),
  },
];

// ── Static generation ─────────────────────────────────────────────────────────

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — SeeIt Studio`,
    description: post.excerpt,
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  ).slice(0, 3);

  return (
    <>
      <NavHeader />

      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">

        {/* ── Hero image ───────────────────────────────────────────────────── */}
        <div className={`w-full h-56 sm:h-72 bg-gradient-to-br ${HERO_GRADIENT[post.category]}`} />

        {/* ── Article ──────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-10 sm:py-14 items-start">

            {/* ── Main content ──────────────────────────────────────────── */}
            <article className="lg:col-span-2">

              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-6">
                <Link href="/" className="hover:text-[#0B0F19] transition-colors">Home</Link>
                <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <Link href="/blog" className="hover:text-[#0B0F19] transition-colors">Blog</Link>
                <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <span className="text-[#0B0F19] font-medium truncate max-w-[180px]">{post.title}</span>
              </nav>

              {/* Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${CATEGORY_COLORS[post.category]}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-[#64748B]">{post.readTime}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B0F19] leading-snug mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0B0F19]">{post.author}</p>
                    <time className="text-xs text-[#64748B]">{formatDate(post.date)}</time>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-slate-200 mb-8" />

              {/* Body */}
              <div className="prose-custom">
                {post.content}
              </div>

              {/* Back link */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#D9534F] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Back to all articles
                </Link>
              </div>
            </article>

            {/* ── Sidebar ───────────────────────────────────────────────── */}
            <aside className="flex flex-col gap-6 sticky top-28">

              {/* About the author */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-[#0F172A] px-5 py-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{post.author}</p>
                    <p className="text-xs text-slate-400">3D Digital Design Coach</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    35+ years of experience in CAD, BIM, and 3D design. Certified SketchUp trainer and authorised UK reseller.
                  </p>
                  <Link
                    href="/about"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D9534F] hover:text-[#c9302c] transition-colors"
                  >
                    About SeeIt Studio
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-[#0B0F19] mb-4">More in {post.category}</h3>
                  <div className="flex flex-col gap-4">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/blog/${r.slug}`}
                        className="group flex flex-col gap-1"
                      >
                        <p className="text-sm font-medium text-[#0B0F19] group-hover:text-[#D9534F] transition-colors leading-snug">
                          {r.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-[#64748B]">
                          <time>{formatDate(r.date)}</time>
                          <span>·</span>
                          <span>{r.readTime}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-[#0F172A] rounded-xl p-5">
                <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
                  Learn more
                </p>
                <p className="text-sm font-semibold text-white mb-2 leading-snug">
                  Want hands-on training?
                </p>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  We run expert-led courses covering SketchUp, rendering tools, and more.
                </p>
                <Link
                  href="/training"
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
                >
                  View Training Courses
                </Link>
              </div>
            </aside>

          </div>
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-[#0F172A] rounded-2xl px-6 py-10 sm:px-10 sm:py-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
                Keep reading
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                More insights & resources
              </h2>
              <p className="text-sm text-slate-400 max-w-md">
                Browse all articles on SketchUp, rendering, AI, and web design for professionals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0F172A] bg-white rounded-lg hover:bg-slate-100 transition-colors"
              >
                All Articles
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
