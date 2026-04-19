import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),

    // ✅ FIXED CATEGORY (dynamic reference)
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),

    defineField({
      name: "price",
      title: "Price (£)",
      type: "number",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "e.g. Best Seller, New",
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],

  // ✅ FIXED PREVIEW (category.title use karega)
  preview: {
    select: {
      title: "name",
      categoryTitle: "category.title",
      media: "image",
    },
    prepare(selection) {
      const { title, categoryTitle, media } = selection;
      return {
        title,
        subtitle: categoryTitle || "No category",
        media,
      };
    },
  },
});