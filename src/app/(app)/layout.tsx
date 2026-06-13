import { AppShell } from "@/components/app-shell";
import { getCurrentUser } from "@/lib/demo-user";

export const dynamic = "force-dynamic";

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return <AppShell user={user}>{children}</AppShell>;
}
