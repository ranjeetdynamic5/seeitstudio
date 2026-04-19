// Single source of truth for all product data.
// Used by: /products catalog page, /products/[slug] detail page, ProductCard.

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  logo?: string;
  features?: string[];
  longDescription?: string;
};

export const ALL_PRODUCTS: Product[] = [
  // ── SketchUp ────────────────────────────────────────────────────────────────
  {
    id: "sketchup-go",
    name: "SketchUp Go — Annual Subscription",
    category: "SketchUp",
    price: 119.00,
    description:
      "Web-based 3D modelling for individuals. Create anywhere, share with anyone. Great entry point for freelancers and sole practitioners.",
    rating: 4,
    reviewCount: 87,
    logo: "/logos/Skp_trimble.png",
    features: [
      "Full web-based 3D modelling — no installation required",
      "Access from any device via browser",
      "500 GB Trimble Connect cloud storage",
      "AR viewer for presenting designs on-site",
      "Access to the 3D Warehouse model library",
    ],
  },
  {
    id: "sketchup-pro-2025",
    name: "SketchUp Pro 2025 — Annual Subscription",
    category: "SketchUp",
    price: 299.99,
    originalPrice: 349.99,
    description:
      "The industry-standard 3D modelling platform for architects and designers, now with enhanced AI-assisted workflows.",
    badge: "Best Seller",
    rating: 5,
    reviewCount: 214,
    logo: "/logos/Skp_trimble.png",
    features: [
      "Desktop 3D modelling with LayOut for 2D documentation",
      "Advanced drawing and modelling tools for professionals",
      "AI-assisted design workflows (2025 edition)",
      "Unlimited cloud storage via Trimble Connect",
      "Access to 1,000+ extensions via Extension Warehouse",
      "Import/export: DWG, DXF, IFC, OBJ, FBX, and more",
    ],
    longDescription: `SketchUp Pro 2025 is the definitive 3D modelling platform for architecture, interior design, landscape, and construction professionals. Trusted by hundreds of thousands of practitioners worldwide, it combines an intuitive push-pull interface with powerful drawing tools that let you move from concept to construction documentation inside a single application.\n\nThe 2025 edition introduces AI-assisted design workflows, helping you generate floor plan variations, automate repetitive modelling tasks, and explore design options at a pace that simply wasn't possible before. These tools are built directly into the SketchUp environment — no plug-ins, no switching context.\n\nLayOut, included in every Pro licence, transforms your 3D model into dimensioned, annotated 2D drawings ready for planning submissions, client presentations, and contractor packages. Dynamic views keep your drawings live-linked to the model: update the geometry and the documents update automatically.\n\nWith unlimited Trimble Connect cloud storage, every version of your model is backed up and shareable with clients and collaborators in seconds. And with over 1,000 extensions in the Extension Warehouse, SketchUp Pro grows with your workflow — from structural analysis to automated scheduling to photorealistic rendering.`,
  },
  {
    id: "sketchup-studio",
    name: "SketchUp Studio — Annual Subscription",
    category: "SketchUp",
    price: 699.00,
    description:
      "The complete professional package. Includes SketchUp Pro, V-Ray for SketchUp, Scan Essentials, and Sefaira energy analysis.",
    badge: "Complete",
    rating: 5,
    reviewCount: 132,
    logo: "/logos/Skp_trimble.png",
    features: [
      "Everything in SketchUp Pro included",
      "V-Ray for SketchUp — photorealistic rendering",
      "Scan Essentials — point cloud import and modelling",
      "Sefaira — real-time energy and daylighting analysis",
      "Unlimited Trimble Connect cloud storage",
      "Priority technical support",
    ],
  },
  {
    id: "trimble-connect",
    name: "Trimble Connect — Business",
    category: "SketchUp",
    price: 19.00,
    description:
      "Cloud-based collaboration for construction and design teams. Share models, manage data, and coordinate across disciplines in real time.",
    rating: 4,
    reviewCount: 56,
    logo: "/logos/Skp_trimble.png",
    features: [
      "Unlimited cloud storage for 3D models and documents",
      "Real-time multi-discipline coordination",
      "Model clash detection and issue tracking",
      "Mobile and web viewer — no software install for viewers",
      "Integrates with SketchUp, Revit, and AutoCAD",
    ],
  },
  {
    id: "sefaira",
    name: "Sefaira — Energy Analysis",
    category: "SketchUp",
    price: 499.00,
    description:
      "Real-time building performance analysis integrated with SketchUp. Optimise energy use, daylighting, and thermal comfort from concept stage.",
    rating: 4,
    reviewCount: 41,
    logo: "/logos/Skp_trimble.png",
    features: [
      "Real-time energy use intensity (EUI) feedback",
      "Daylighting and thermal comfort analysis",
      "Climate-based analysis for any global location",
      "Passive design strategy comparison",
      "LEED, BREEAM, and net-zero workflow support",
    ],
  },

  // ── Extensions ──────────────────────────────────────────────────────────────
  {
    id: "mind-sight-pack",
    name: "mind.sight.studios — Extension Pack",
    category: "Extensions",
    price: 49.00,
    description:
      "A curated collection of productivity plugins for SketchUp. Includes Bevel, Architect Tools, and more — built for professional workflows.",
    rating: 5,
    reviewCount: 103,
    logo: "/logos/mind-site.png",
    features: [
      "Bevel — one-click edge bevelling and chamfering",
      "Architect Tools — walls, floors, and openings in seconds",
      "Curic Mirror and Stretch for rapid geometry editing",
      "Regular updates and new tools added throughout the year",
      "Compatible with SketchUp 2022 and above",
    ],
  },
  {
    id: "skalp-sketchup",
    name: "Skalp for SketchUp",
    category: "Extensions",
    price: 79.00,
    description:
      "Advanced section fill and hatching plugin. Generate professional architectural plans and sections with live, editable hatch patterns.",
    rating: 4,
    reviewCount: 68,
    logo: "/logos/skalp.png",
    features: [
      "Live section fills with editable hatch patterns",
      "Automatic cut-fill applied to walls, slabs, and roofs",
      "Export directly to LayOut with fills intact",
      "300+ built-in materials and hatch library",
      "Real-time preview as you draw sections",
    ],
  },
  {
    id: "flextools",
    name: "FlexTools for SketchUp",
    category: "Extensions",
    price: 49.00,
    originalPrice: 59.00,
    description:
      "Smart window, door, and opening tools. FlexDoors and FlexWindows cut openings automatically — no manual Boolean operations required.",
    badge: "Sale",
    rating: 5,
    reviewCount: 89,
    logo: "/logos/flextools.png",
    features: [
      "Auto-cut openings in walls — no Boolean operations",
      "Parametric doors and windows with live resizing",
      "Hundreds of pre-built door and window components",
      "Dynamic component style — change swing, glazing, frame instantly",
      "Compatible with LayOut for construction documentation",
    ],
  },
  {
    id: "simlab-composer",
    name: "SimLab Composer — SketchUp Plugin",
    category: "Extensions",
    price: 129.00,
    description:
      "Professional rendering and VR plugin for SketchUp. Photorealistic output, VR scene export, and interactive 3D PDF creation in one package.",
    rating: 4,
    reviewCount: 54,
    logo: "/logos/simlab.png",
    features: [
      "Photorealistic rendering with global illumination",
      "VR scene export for Oculus, HTC Vive, and Meta headsets",
      "Interactive 3D PDF creation from SketchUp models",
      "Material editor with PBR texture support",
      "Animation and walkthrough tools built-in",
    ],
  },

  // ── Rendering ───────────────────────────────────────────────────────────────
  {
    id: "vray-sketchup",
    name: "V-Ray for SketchUp — Annual Licence",
    category: "Rendering",
    price: 449.00,
    description:
      "Production-quality rendering integrated directly into SketchUp. Physically accurate lighting, global illumination, and a vast material library.",
    rating: 5,
    reviewCount: 178,
    logo: "/logos/chaos.png",
    features: [
      "Physically accurate global illumination engine",
      "GPU + CPU hybrid rendering for fast results",
      "Chaos Cosmos asset library — thousands of ready-to-use materials",
      "Interactive Lens Effects — bokeh, lens flares, exposure",
      "V-Ray Swarm — distribute renders across multiple machines",
      "Compatible with SketchUp 2020 and above",
    ],
    longDescription: `V-Ray for SketchUp is the industry benchmark for architectural visualisation. Developed by Chaos Group, it brings the same physically accurate rendering engine used in Hollywood VFX and top-tier architecture firms directly into the SketchUp modelling environment.\n\nAt its core, V-Ray simulates real-world light behaviour — global illumination, caustics, subsurface scattering, and displacement — to produce images that are indistinguishable from photography. The GPU and CPU hybrid rendering engine means you get fast interactive previews while you work, and you can scale up to full production quality for final deliverables without changing a single setting.\n\nThe Chaos Cosmos asset library gives you instant access to thousands of photorealistic materials, plants, people, furniture, and vehicles — all drag-and-drop ready. Combined with V-Ray's powerful material editor and HDRI lighting tools, you can build compelling scenes in a fraction of the time it would take from scratch.\n\nV-Ray Swarm lets you distribute renders across every machine on your network, dramatically cutting render times on large projects. And because V-Ray uses the same scene format across all supported applications, assets and materials created in SketchUp can be reused in Revit, Rhino, 3ds Max, and Cinema 4D without re-work.`,
  },
  {
    id: "vray-collection",
    name: "Chaos V-Ray Collection",
    category: "Rendering",
    price: 699.00,
    description:
      "Studio access to V-Ray for SketchUp, Revit, Rhino, 3ds Max, and Cinema 4D under a single floating licence. Maximum flexibility for multi-app studios.",
    badge: "Best Value",
    rating: 5,
    reviewCount: 142,
    logo: "/logos/chaos.png",
    features: [
      "Floating licence — use across any supported app",
      "V-Ray for SketchUp, Revit, Rhino, 3ds Max, Cinema 4D",
      "Chaos Vantage real-time ray tracing included",
      "Chaos Cosmos full asset library access",
      "Cloud rendering credits via Chaos Cloud",
      "Priority support and updates",
    ],
  },
  {
    id: "chaos-vantage",
    name: "Chaos Vantage — Real-Time Rendering",
    category: "Rendering",
    price: 299.00,
    description:
      "GPU-accelerated real-time ray tracing for instant photorealistic previews. Import V-Ray scenes and walk through them live.",
    rating: 4,
    reviewCount: 71,
    logo: "/logos/chaos.png",
    features: [
      "Real-time ray tracing at full path-traced quality",
      "Import V-Ray scenes directly — no re-setup needed",
      "Live walkthrough with photorealistic lighting",
      "NVIDIA RTX GPU acceleration",
      "Export high-resolution stills and animations",
    ],
  },
  {
    id: "d5-render-pro",
    name: "D5 Render Pro — Annual",
    category: "Rendering",
    price: 279.00,
    originalPrice: 329.00,
    description:
      "Real-time ray-tracing renderer with a vast built-in asset library. One-click SketchUp sync, cinematic lighting, and stunning material effects.",
    badge: "Sale",
    rating: 5,
    reviewCount: 96,
    logo: "/logos/d5_render.png",
    features: [
      "One-click live sync with SketchUp — no export required",
      "Real-time ray tracing with RTX support",
      "1,000+ built-in high-quality materials and assets",
      "Cinematic depth of field, bloom, and lens flares",
      "Animation sequencer for walkthrough videos",
      "2K/4K output with denoising",
    ],
    longDescription: `D5 Render has redefined what real-time rendering means for design professionals. Powered by NVIDIA RTX ray tracing technology, it produces photorealistic images and animations that previously required hours of CPU rendering time — delivered in seconds, right inside your workflow.\n\nThe one-click SketchUp live sync is genuinely transformative: make a change to your model and see it reflected instantly in D5, with no export, no re-import, and no interruption to your creative process. The connection is persistent, meaning D5 functions as a real-time visualisation companion to SketchUp throughout your entire project lifecycle.\n\nD5's built-in asset library contains over 1,000 high-quality materials, plants, vehicles, and furniture items, all physically calibrated and ready to drag into your scene. The material editor supports full PBR workflows — roughness, metalness, displacement, and emissive channels — giving you complete control over surface appearance.\n\nFor presentations and client deliverables, D5's animation sequencer lets you create polished walkthrough videos with smooth camera paths, animated weather, and time-of-day transitions. Output at up to 4K with AI denoising enabled, and share a professional-grade video that rivals anything produced by a dedicated visualisation studio.`,
  },
  {
    id: "thea-render",
    name: "Thea Render for SketchUp",
    category: "Rendering",
    price: 229.00,
    description:
      "Feature-rich unbiased and biased renderer natively integrated into SketchUp. Physical sun and sky, photorealistic materials, and GPU acceleration.",
    rating: 4,
    reviewCount: 63,
    logo: "/logos/thea_render.png",
    features: [
      "Unbiased (Presto) and biased (TR1/TR2) render engines",
      "Physical sun, sky, and HDRI environment lighting",
      "Subsurface scattering, displacement, and caustics",
      "GPU rendering on NVIDIA and AMD cards",
      "Deep integration — render directly inside SketchUp",
    ],
  },
  {
    id: "twinmotion",
    name: "Twinmotion — Annual Licence",
    category: "Rendering",
    price: 449.00,
    description:
      "Real-time immersive 3D visualisation. Import your SketchUp model and instantly produce high-quality images, panoramas, and animated walkthroughs.",
    rating: 4,
    reviewCount: 118,
    logo: "/logos/twinmotion.png",
    features: [
      "Direct SketchUp sync via Datasmith plugin",
      "Photorealistic real-time visualisation with Lumen GI",
      "360° panorama and VR export",
      "Built-in library of 10,000+ objects, materials, and characters",
      "Animated weather, time of day, and vegetation",
      "Path Tracer for final production-quality output",
    ],
  },
  {
    id: "supodium",
    name: "Supodium — Rendering Plugin",
    category: "Rendering",
    price: 199.00,
    description:
      "Approachable rendering plugin for SketchUp. Ideal for designers who want great results without a steep learning curve — quick setup, quality output.",
    rating: 4,
    reviewCount: 45,
    logo: "/logos/supodium.png",
    features: [
      "Simple interface — minimal learning curve",
      "One-click rendering from inside SketchUp",
      "Physically based lighting and materials",
      "Batch rendering for multiple scenes",
      "Regular preset library updates",
    ],
  },
  {
    id: "enscape-licence",
    name: "Enscape — Real-Time Renderer",
    category: "Rendering",
    price: 379.00,
    originalPrice: 429.00,
    description:
      "Real-time rendering and VR for SketchUp, Revit, Rhino, and ArchiCAD. Instant visual feedback with one-click VR walkthrough export.",
    rating: 5,
    reviewCount: 156,
    features: [
      "Real-time rendering — instant visual feedback as you model",
      "Supports SketchUp, Revit, Rhino, and ArchiCAD",
      "One-click VR export for Meta Quest and Oculus",
      "Standalone EXE export — share walkthroughs without software",
      "Enscape Asset Library with 3,500+ ready-made objects",
      "Batch rendering and video export",
    ],
    longDescription: `Enscape has become the go-to real-time renderer for architects and interior designers who need to present ideas at speed — without sacrificing quality. Unlike traditional offline renderers, Enscape runs live inside your CAD application: every geometry change, material swap, or lighting adjustment is visible in the Enscape window the moment you make it.\n\nThe result is a fundamentally different way of designing. Instead of rendering at the end of a project to check how something looks, you're making informed design decisions throughout — because you can always see exactly how the space will appear in reality. This is particularly powerful for interior projects where lighting quality and material choices are critical.\n\nClient presentations are transformed by Enscape's standalone EXE export. Compile your model into a self-contained walkthrough application that your client can run on any Windows machine, navigate freely, and experience in first-person — without needing Enscape, SketchUp, or any other software installed. For even more immersive presentations, one-click VR export puts your project onto a Meta Quest or Oculus headset in minutes.\n\nThe Enscape Asset Library provides 3,500+ ready-made plants, furniture, vehicles, and people — all LOD-optimised for real-time performance. Combined with support for custom IES light profiles and HDRI skies, you have everything needed to produce presentation-ready visuals at any stage of a project.`,
  },

  // ── AI Tools ────────────────────────────────────────────────────────────────
  {
    id: "ai-diffusion-studio",
    name: "AI Diffusion Studio — Pro Plan",
    category: "AI Tools",
    price: 49.99,
    description:
      "AI-powered image generation and design enhancement built for architecture and interior design workflows. Generate, iterate, and enhance at speed.",
    badge: "New",
    rating: 4,
    reviewCount: 93,
    features: [
      "Text-to-image generation trained on architectural imagery",
      "Sketch-to-render: convert hand drawings to photorealistic output",
      "Style transfer across interior and exterior scenes",
      "Inpainting and outpainting for scene extension",
      "Batch processing — generate multiple variations simultaneously",
    ],
  },
  {
    id: "3skng-ai",
    name: "3skng — AI Design Platform",
    category: "AI Tools",
    price: 39.00,
    description:
      "AI-driven design assistant for SketchUp professionals. Automate repetitive tasks, generate concept variations, and accelerate project delivery.",
    badge: "New",
    rating: 4,
    reviewCount: 38,
    logo: "/logos/3skng.png",
    features: [
      "AI-assisted SketchUp component placement and scaling",
      "Automated floor plan generation from brief input",
      "Design variation generator — explore options in seconds",
      "Natural language task automation inside SketchUp",
      "Integration with V-Ray and Enscape for instant AI renders",
    ],
  },

  // ── Bundles ─────────────────────────────────────────────────────────────────
  {
    id: "bundle-pro-vray",
    name: "SketchUp Pro + V-Ray Bundle",
    category: "Bundles",
    price: 649.00,
    originalPrice: 748.99,
    description:
      "The essential design + rendering stack. SketchUp Pro 2025 and V-Ray for SketchUp together at a significant saving over individual pricing.",
    badge: "Save £100",
    rating: 5,
    reviewCount: 77,
    logo: "/logos/Skp_trimble.png",
    features: [
      "SketchUp Pro 2025 — full desktop 3D modelling suite",
      "V-Ray for SketchUp — production-quality rendering",
      "Save over £100 vs buying separately",
      "Delivered as two separate licence keys",
      "Both licences include 12 months of updates and support",
    ],
    longDescription: `The SketchUp Pro + V-Ray Bundle is the definitive software stack for design professionals who need both best-in-class 3D modelling and production-quality rendering under a single purchase. Rather than piecing together a workflow from separate tools, this bundle gives you a tightly integrated pipeline — from first sketch to final deliverable — at a price that saves you over £100 compared to buying each licence separately.\n\nSketchUp Pro 2025 handles the modelling and documentation side: intuitive push-pull geometry, LayOut for 2D construction drawings, and AI-assisted workflows introduced in the 2025 edition. V-Ray for SketchUp plugs directly into that environment to provide a physically accurate rendering engine that transforms your 3D models into photorealistic images and animations.\n\nThe combination is particularly powerful because V-Ray operates entirely within SketchUp — there's no export, no round-tripping, and no learning a second application's interface. You apply V-Ray materials directly to SketchUp geometry, set up lighting within your model's sun and shadow system, and hit render without ever leaving the tool you already know.\n\nBoth licences are delivered as separate licence keys and include 12 months of updates and priority technical support. Whether you're an individual practitioner or equipping a team, this bundle represents the most cost-effective route to a professional visualisation workflow.`,
  },
  {
    id: "bundle-studio-extensions",
    name: "SketchUp Studio + Extensions Pack",
    category: "Bundles",
    price: 849.00,
    originalPrice: 999.00,
    description:
      "Everything a professional studio needs. SketchUp Studio paired with the mind.sight.studios Extension Pack, FlexTools, and Skalp.",
    badge: "Best Bundle",
    rating: 5,
    reviewCount: 52,
    logo: "/logos/Skp_trimble.png",
    features: [
      "SketchUp Studio — Pro + V-Ray + Sefaira + Scan Essentials",
      "mind.sight.studios Extension Pack",
      "FlexTools for SketchUp — smart doors and windows",
      "Skalp — professional section fills and hatching",
      "Save £150 vs individual pricing",
      "All licences include 12 months of updates",
    ],
  },
  {
    id: "bundle-rendering-starter",
    name: "Rendering Starter Bundle",
    category: "Bundles",
    price: 599.00,
    originalPrice: 728.00,
    description:
      "Get started with professional visualisation. Includes D5 Render Pro and Thea Render for SketchUp — two complementary renderers for every workflow.",
    badge: "Save £129",
    rating: 4,
    reviewCount: 34,
    features: [
      "D5 Render Pro — real-time ray tracing with one-click SketchUp sync",
      "Thea Render for SketchUp — unbiased and biased rendering",
      "Save £129 vs buying individually",
      "Ideal for exploring different rendering styles",
      "Both licences include 12 months of updates",
    ],
  },

  // ── CAD ─────────────────────────────────────────────────────────────────────
  {
    id: "zwcad-standard",
    name: "ZWCAD Standard",
    category: "CAD",
    price: 499.00,
    description:
      "A powerful DWG-compatible CAD platform for 2D drafting and basic 3D. Familiar interface, full DXF/DWG support — at a fraction of the AutoCAD price.",
    rating: 4,
    reviewCount: 61,
    logo: "/logos/zwcad.png",
    features: [
      "Full DWG/DXF read and write compatibility",
      "2D drafting tools matching AutoCAD workflow",
      "Basic 3D solid modelling",
      "LISP, VBA, and .NET API support",
      "PDF underlay and batch plotting",
    ],
  },
  {
    id: "zwcad-professional",
    name: "ZWCAD Professional",
    category: "CAD",
    price: 799.00,
    description:
      "Advanced 2D and 3D CAD with full DWG compatibility, BIM tools, and API customisation. The professional alternative to AutoCAD.",
    badge: "Recommended",
    rating: 5,
    reviewCount: 89,
    logo: "/logos/zwcad.png",
    features: [
      "All ZWCAD Standard features included",
      "Advanced 3D solid and surface modelling",
      "IFC import/export for BIM workflows",
      "Smart Voice — voice-activated command input",
      "Hardware-accelerated rendering viewport",
      "Full LISP, VBA, .NET, and ZRX API",
    ],
  },
  {
    id: "moi3d",
    name: "Moment of Inspiration — MoI 3D",
    category: "CAD",
    price: 295.00,
    description:
      "NURBS-based 3D modelling for designers. Beautifully clean interface, smooth curves, and excellent mesh export for 3D printing and rendering.",
    rating: 5,
    reviewCount: 48,
    logo: "/logos/moment_of_inspiration.png",
    features: [
      "NURBS and Boolean modelling built for designers",
      "Minimal, distraction-free interface",
      "Superb mesh export quality for rendering and 3D printing",
      "Exports OBJ, FBX, STL, IGES, STEP, and more",
      "Pen tablet and stylus optimised",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === slug);
}
