import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "ibaf5v0k",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: true,
});
