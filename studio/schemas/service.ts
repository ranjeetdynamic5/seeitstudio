import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 2 }),
    defineField({ name: "description", title: "Full Description", type: "text", rows: 5 }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "problems",
      title: "Problems We Solve",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "cta", title: "CTA Label", type: "string", description: "e.g. Request a Quote" }),
  ],
  preview: {
    select: { title: "title", subtitle: "shortDescription" },
  },
});
