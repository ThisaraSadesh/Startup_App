/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { useEffect, useState } from "react";
import "../studio.css";

export default function StudioPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Clean up any browser extension attributes that cause hydration issues
    const cleanupAttributes = () => {
      const elements = document.querySelectorAll("[bis_skin_checked]");
      elements.forEach((el) => {
        el.removeAttribute("bis_skin_checked");
      });
    };

    // Clean up immediately and on DOM changes
    cleanupAttributes();
    const observer = new MutationObserver(cleanupAttributes);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["bis_skin_checked"],
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#f1f3f4",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              border: "3px solid #f3f3f3",
              borderTop: "3px solid #666",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          Loading Sanity Studio...
        </div>
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
