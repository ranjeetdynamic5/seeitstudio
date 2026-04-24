import { defineField, defineType } from "sanity";

export const contactLead = defineType({
  name: "contactLead",
  title: "Contact Lead",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "inquiryType",
      title: "Inquiry Type",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
    }),
    defineField({
      name: "source",
      title: "How They Found Us",
      type: "string",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      status: "status",
      inquiryType: "inquiryType",
      createdAt: "createdAt",
    },
    prepare({ title, subtitle, status, inquiryType, createdAt }) {
      const date = createdAt
        ? new Date(createdAt).toLocaleDateString("en-GB")
        : "";
      const badge = status === "new" ? "🟢" : status === "contacted" ? "🟡" : "⚫";
      return {
        title: `${badge} ${title}`,
        subtitle: [subtitle, inquiryType, date].filter(Boolean).join(" · "),
      };
    },
  },
});
