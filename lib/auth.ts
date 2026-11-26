import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { getGithubOAuth } from "@/lib/env";
import { MIN_PASSWORD_LENGTH } from "@/lib/constants";

const github = getGithubOAuth();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: MIN_PASSWORD_LENGTH,
  },
  // GitHub sign-in is optional; it is enabled only when both env vars are set.
  socialProviders: github ? { github } : {},
});
