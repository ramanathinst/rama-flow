// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Import with `import * as Sentry from "@sentry/nextjs"` if you are using ESM
Sentry.init({
  dsn: "https://db3a2271f49a205a0bfdd70d2604025e@o4510407801765888.ingest.us.sentry.io/4510407812317184",
  integrations: [
    // Add the Vercel AI SDK integration to sentry.server.config.ts
    Sentry.vercelAIIntegration({
      recordInputs: true,
      recordOutputs: true,
    }),
  ],
  // Tracing must be enabled for agent monitoring to work
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
});
