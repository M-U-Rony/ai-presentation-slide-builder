import SigninForm from "@/components/signin-form";
import { getGithubOAuth } from "@/lib/env";

// Server wrapper so the form knows whether GitHub sign-in is configured.
export const dynamic = "force-dynamic";

export default function Page() {
  return <SigninForm githubEnabled={getGithubOAuth() !== null} />;
}
