import { defineField, defineType } from "sanity";

export const training = defineType({
  name: "training",
  title: "Training Course",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["SketchUp", "Rendering", "Extensions", "AI", "Events"] },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g. 1 day, Half day",
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      options: { list: ["Online", "In-Person", "Hybrid"] },
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      options: { list: ["Beginner", "Intermediate", "Advanced", "All Levels"] },
    }),
    defineField({
      name: "price",
      title: "Price (£)",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
});
