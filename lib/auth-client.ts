import { createAuthClient } from "better-auth/react";

// No baseURL: the client talks to the same origin the app is served from.
export const authClient = createAuthClient();

export const { signIn, signUp, useSession } = authClient;
