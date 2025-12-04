import { Sidebar } from "@/components/admin/Sidebar";

export const metadata = {
  title: "KB Command Center - Admin",
  description: "Admin dashboard for Kendrobimukhi",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
