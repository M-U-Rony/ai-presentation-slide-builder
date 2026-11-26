import { apiOk, handleRoute, requireSession } from "@/lib/api";
import { getUsage } from "@/lib/usage";

export const GET = handleRoute("usage", async () => {
  const session = await requireSession();
  return apiOk(await getUsage(session.user.id));
});
