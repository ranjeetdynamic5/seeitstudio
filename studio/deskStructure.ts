import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Leads CRM")
        .child(
          S.list()
            .title("Leads CRM")
            .items([
              S.listItem()
                .title("New Leads")
                .child(
                  S.documentList()
                    .title("New Leads")
                    .filter('_type == "contactLead" && status == "new"')
                    .defaultOrdering([{ field: "createdAt", direction: "desc" }])
                ),
              S.listItem()
                .title("Contacted")
                .child(
                  S.documentList()
                    .title("Contacted")
                    .filter('_type == "contactLead" && status == "contacted"')
                    .defaultOrdering([{ field: "createdAt", direction: "desc" }])
                ),
              S.listItem()
                .title("Closed")
                .child(
                  S.documentList()
                    .title("Closed")
                    .filter('_type == "contactLead" && status == "closed"')
                    .defaultOrdering([{ field: "createdAt", direction: "desc" }])
                ),
              S.divider(),
              S.listItem()
                .title("All Leads")
                .child(
                  S.documentList()
                    .title("All Leads")
                    .filter('_type == "contactLead"')
                    .defaultOrdering([{ field: "createdAt", direction: "desc" }])
                ),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "contactLead"
      ),
    ]);
