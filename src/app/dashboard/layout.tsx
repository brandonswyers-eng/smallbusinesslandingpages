import { AppShell, SetupNotice } from "@/components/platform/ui";
import { platformConfigured } from "@/lib/platform/runtime";
import { requireProfile } from "@/lib/platform/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!platformConfigured()) return <SetupNotice />;
  await requireProfile("dashboard");
  return (
    <AppShell area="dashboard" title="Your website workspace">
      {children}
    </AppShell>
  );
}
