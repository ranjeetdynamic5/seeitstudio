import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "seeit-studio",
  title: "SeeIt Studio CMS",

  projectId: "ibaf5v0k",
  dataset: "production",

  plugins: [
    structureTool(),
      ],

  schema: {
    types: schemaTypes,
  },
});
