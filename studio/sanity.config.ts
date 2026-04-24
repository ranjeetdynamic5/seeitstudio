import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";
import { structure } from "./deskStructure";

export default defineConfig({
  name: "seeit-studio",
  title: "SeeIt Studio CMS",

  projectId: "ibaf5v0k",
  dataset: "production",

  plugins: [
    structureTool({ structure }),
  ],

  schema: {
    types: schemaTypes,
  },
});
