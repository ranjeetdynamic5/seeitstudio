export type Course = {
  id: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  format: "Online" | "In-Person" | "Hybrid";
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  price: number;
};

export const COURSES: Course[] = [
  {
    id: "sketchup-beginners",
    category: "SketchUp",
    title: "SketchUp for Beginners",
    description:
      "Learn the fundamentals of 3D modelling in SketchUp. Covers navigation, push-pull geometry, groups, and components — ideal for those new to the software.",
    duration: "1 day",
    format: "Online",
    level: "Beginner",
    price: 195.00,
  },
  {
    id: "sketchup-pro-advanced",
    category: "SketchUp",
    title: "SketchUp Pro: Advanced Modelling",
    description:
      "Take your SketchUp skills further with advanced geometry, LayOut for construction documents, dynamic components, and professional presentation workflows.",
    duration: "2 days",
    format: "Online",
    level: "Advanced",
    price: 345.00,
  },
  {
    id: "sketchup-interior-design",
    category: "SketchUp",
    title: "SketchUp for Interior Design",
    description:
      "Purpose-built for interior designers. Learn how to model spaces, apply materials, set up scenes, and produce client-ready visuals using SketchUp and LayOut.",
    duration: "1 day",
    format: "Hybrid",
    level: "Intermediate",
    price: 245.00,
  },
  {
    id: "vray-sketchup-training",
    category: "Rendering",
    title: "V-Ray for SketchUp: Essentials",
    description:
      "Master physically accurate rendering with V-Ray. Covers lighting setup, material creation, camera settings, and producing high-quality images for client presentations.",
    duration: "1 day",
    format: "Online",
    level: "Intermediate",
    price: 275.00,
  },
  {
    id: "d5-render-training",
    category: "Rendering",
    title: "D5 Render: Real-Time Visualisation",
    description:
      "Learn D5 Render from scratch. Live sync with SketchUp, asset library, material editing, lighting, and producing 4K stills and walkthrough animations.",
    duration: "1 day",
    format: "Online",
    level: "All Levels",
    price: 245.00,
  },
  {
    id: "layout-training",
    category: "SketchUp",
    title: "LayOut for Construction Documents",
    description:
      "Produce professional 2D drawings, dimensions, and annotations directly from your SketchUp models using LayOut. Covers viewports, title blocks, and PDF export.",
    duration: "1 day",
    format: "Online",
    level: "Intermediate",
    price: 195.00,
  },
  {
    id: "enscape-training",
    category: "Rendering",
    title: "Enscape: Real-Time Rendering",
    description:
      "Get up to speed with Enscape quickly. Covers the interface, lighting, materials, VR export, and standalone walkthrough creation for client presentations.",
    duration: "Half day",
    format: "Online",
    level: "Beginner",
    price: 145.00,
  },
  {
    id: "sketchup-extensions-training",
    category: "Extensions",
    title: "SketchUp Extensions Masterclass",
    description:
      "Hands-on training covering the most productive SketchUp extensions: FlexTools, Skalp, mind.sight.studios pack, and the Extension Warehouse. Maximise your workflow.",
    duration: "1 day",
    format: "Online",
    level: "Intermediate",
    price: 225.00,
  },
];
