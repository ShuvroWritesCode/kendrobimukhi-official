"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, X, Loader2 } from "lucide-react";

interface ApproveUserButtonProps {
  userId: string;
  userEmail: string;
  action: "approve" | "reject";
}

export function ApproveUserButton({
  userId,
  userEmail,
  action,
}: ApproveUserButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleAction = async () => {
    setLoading(true);
    try {
      if (action === "approve") {
        // Get current user for approved_by field
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) throw new Error("Not authenticated");

        // Get current admin user's admin_users record
        const { data: currentAdmin } = await supabase
          .from("admin_users")
          .select("id")
          .eq("user_id", user.id)
          .single();

        const { error } = await supabase
          .from("admin_users")
          .update({
            is_approved: true,
            approved_at: new Date().toISOString(),
            approved_by: currentAdmin?.id || null,
          })
          .eq("id", userId);

        if (error) throw error;
      } else {
        // Reject - delete the admin_users record
        const { error } = await supabase
          .from("admin_users")
          .delete()
          .eq("id", userId);

        if (error) throw error;
      }

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {action === "approve" ? (
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <Check className="h-4 w-4 mr-1" />
            Approve
          </Button>
        ) : (
          <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
            <X className="h-4 w-4 mr-1" />
            Reject
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "approve" ? "Approve Admin" : "Reject Admin"}
          </DialogTitle>
          <DialogDescription>
            {action === "approve" ? (
              <>
                Are you sure you want to approve <strong>{userEmail}</strong> as an
                admin? They will be able to access and manage the KB Command Center.
              </>
            ) : (
              <>
                Are you sure you want to reject <strong>{userEmail}</strong>&apos;s admin
                request? They will need to sign up again if they want admin access.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant={action === "approve" ? "default" : "destructive"}
            onClick={handleAction}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {action === "approve" ? "Approving..." : "Rejecting..."}
              </>
            ) : action === "approve" ? (
              "Approve"
            ) : (
              "Reject"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
