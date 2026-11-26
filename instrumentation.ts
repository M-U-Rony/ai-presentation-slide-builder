export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { getEnv } = await import("./lib/env");
    // Fail fast at server start if required configuration is missing.
    getEnv();
  }
}
