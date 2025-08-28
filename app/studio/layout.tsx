import { ReactNode } from "react";

export const metadata = {
  title: "Sanity Studio",
  description: "Content management for StartupAtlas",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="robots" content="noindex,nofollow" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress console warnings for hydration mismatches in development
              if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
                const originalError = console.error;
                console.error = (...args) => {
                  if (typeof args[0] === 'string' && 
                      (args[0].includes('Hydration failed') || 
                       args[0].includes('server rendered HTML') ||
                       args[0].includes('bis_skin_checked'))) {
                    return;
                  }
                  originalError.apply(console, args);
                };
              }
            `,
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0 }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
