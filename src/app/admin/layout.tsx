import { AppShell, SetupNotice } from "@/components/platform/ui";
import { platformConfigured } from "@/lib/platform/runtime";
import { requireProfile } from "@/lib/platform/session";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!platformConfigured()) return <SetupNotice />;
  await requireProfile("admin");
  return (
    <AppShell area="admin" title="Internal workspace">
      {children}
    </AppShell>
  );
}
