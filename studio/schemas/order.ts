import { defineField, defineType } from "sanity";

export const order = defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "orderId",
      title: "Order ID",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "productId", title: "Product ID", type: "string" }),
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "price", title: "Price (£)", type: "number" }),
            defineField({ name: "quantity", title: "Quantity", type: "number" }),
          ],
        },
      ],
    }),
    defineField({
      name: "totalAmount",
      title: "Total Amount (£)",
      type: "number",
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "orderId",
      subtitle: "customerName",
    },
    prepare({ title, subtitle }) {
      return {
        title: `Order ${title}`,
        subtitle: subtitle ?? "Unknown customer",
      };
    },
  },
});
