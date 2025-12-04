import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the auth token
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Check if accessing admin routes (except login/signup)
  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute = pathname === "/admin/login" || pathname === "/admin/signup";

  if (isAdminRoute && !isAuthRoute) {
    // If not logged in, redirect to login
    if (!user) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user is an approved admin
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("is_approved")
      .eq("user_id", user.id)
      .single();

    if (!adminUser || !adminUser.is_approved) {
      // Sign out and redirect to login with error
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If logged in and trying to access login/signup, redirect to dashboard
  if (isAuthRoute && user) {
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("is_approved")
      .eq("user_id", user.id)
      .single();

    if (adminUser?.is_approved) {
      const dashboardUrl = new URL("/admin", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|favicon_io|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
