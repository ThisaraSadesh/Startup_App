"use client";

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { markdownSchema } from "sanity-plugin-markdown";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    markdownSchema(),
  ],
  studio: {
    components: {
      layout: (props: any) => {
        // Suppress hydration warnings for Sanity Studio
        if (typeof window !== "undefined") {
          // Remove any problematic attributes added by browser extensions
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === "attributes") {
                const target = mutation.target as Element;
                if (target.hasAttribute("bis_skin_checked")) {
                  target.removeAttribute("bis_skin_checked");
                }
              }
            });
          });

          observer.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ["bis_skin_checked"],
          });
        }

        return props.renderDefault(props);
      },
    },
  },
});
