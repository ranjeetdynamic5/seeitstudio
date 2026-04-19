export type TrainingCategory = {
  label: string;
  value: string; // used in URL ?category=<value>
  description?: string;
};

export const TRAINING_CATEGORIES: TrainingCategory[] = [
  { label: "All",       value: "all",       description: "Browse the full course catalogue" },
  { label: "SketchUp",  value: "sketchup",  description: "From beginner to advanced" },
  { label: "Rendering", value: "rendering", description: "Lighting, materials & output" },
  { label: "AI",        value: "ai",        description: "Practical AI for design professionals" },
  { label: "Events",    value: "events",    description: "Live group sessions & CPD" },
];

/** Maps a URL param value to the matching category label (used to filter course data). */
export function paramToLabel(param: string | null): string | null {
  if (!param || param === "all") return null;
  const match = TRAINING_CATEGORIES.find((c) => c.value === param.toLowerCase());
  return match && match.value !== "all" ? match.label : null;
}
