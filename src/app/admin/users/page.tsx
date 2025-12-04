import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { ApproveUserButton } from "./ApproveUserButton";

export default async function UsersPage() {
  const supabase = await createClient();

  const { data: adminUsers, error } = await supabase
    .from("admin_users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin users:", error);
  }

  const pendingUsers = adminUsers?.filter((user) => !user.is_approved) || [];
  const approvedUsers = adminUsers?.filter((user) => user.is_approved) || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Users</h1>
        <p className="text-slate-600 mt-1">Manage admin access to KB Command Center</p>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          Pending Approvals
          {pendingUsers.length > 0 && (
            <Badge className="bg-yellow-100 text-yellow-700">
              {pendingUsers.length}
            </Badge>
          )}
        </h2>

        {pendingUsers.length > 0 ? (
          <div className="space-y-3">
            {pendingUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-slate-500">
                    Requested on {formatDate(user.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ApproveUserButton userId={user.id} userEmail={user.email} action="approve" />
                  <ApproveUserButton userId={user.id} userEmail={user.email} action="reject" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">
            No pending approval requests
          </p>
        )}
      </div>

      {/* Approved Admins */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Approved Admins</h2>

        {approvedUsers.length > 0 ? (
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">
                    Approved On
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {approvedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">{user.email}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {user.approved_at ? formatDate(user.approved_at) : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Active
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">
            No approved admins yet
          </p>
        )}
      </div>
    </div>
  );
}
