import SignupForm from "@/components/signup-form";
import { getGithubOAuth } from "@/lib/env";

// Server wrapper so the form knows whether GitHub sign-in is configured.
export const dynamic = "force-dynamic";

export default function Page() {
  return <SignupForm githubEnabled={getGithubOAuth() !== null} />;
}
