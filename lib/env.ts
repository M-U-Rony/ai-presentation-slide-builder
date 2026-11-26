import { z } from "zod";

const nonEmpty = (name: string) =>
  z.string({ error: `${name} is not set` }).trim().min(1, `${name} is not set`);

const EnvSchema = z.object({
  DATABASE_URL: nonEmpty("DATABASE_URL"),
  BETTER_AUTH_SECRET: nonEmpty("BETTER_AUTH_SECRET"),
  OPENROUTER_API_KEY: nonEmpty("OPENROUTER_API_KEY"),
  TEXT_GENERATION_MODEL: nonEmpty("TEXT_GENERATION_MODEL"),
  IMAGE_GENERATION_MODEL: nonEmpty("IMAGE_GENERATION_MODEL"),
});

export type Env = z.infer<typeof EnvSchema>;

let cached: Env | null = null;

/**
 * Validated server environment. Validation runs lazily (on first call) so
 * `next build` does not need runtime secrets; `instrumentation.ts` calls this
 * at server start so a missing variable fails fast with a clear message.
 *
 * The model variables used to be named `Text_Generation_Model` /
 * `Image_Generation_Model`; those names are still accepted as a fallback.
 */
export function getEnv(): Env {
  if (cached) return cached;

  const result = EnvSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    TEXT_GENERATION_MODEL:
      process.env.TEXT_GENERATION_MODEL || process.env.Text_Generation_Model,
    IMAGE_GENERATION_MODEL:
      process.env.IMAGE_GENERATION_MODEL || process.env.Image_Generation_Model,
  });

  if (!result.success) {
    const problems = result.error.issues.map((i) => `  - ${i.message}`).join("\n");
    throw new Error(`Invalid environment configuration:\n${problems}\nSee .env.example.`);
  }

  cached = result.data;
  return cached;
}

/** GitHub OAuth is optional: enabled only when both values are present. */
export function getGithubOAuth(): { clientId: string; clientSecret: string } | null {
  const clientId = process.env.GITHUB_CLIENT_ID?.trim();
  const clientSecret = process.env.GITHUB_CLIENT_SECRET?.trim();
  return clientId && clientSecret ? { clientId, clientSecret } : null;
}
