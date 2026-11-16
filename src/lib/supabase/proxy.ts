import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PATHS = ["/checkout", "/orders"];
const GUEST_ONLY_PATHS = ["/login", "/register"];

function isPathOrChild(pathname: string, base: string): boolean {
  return pathname === base || pathname.startsWith(`${base}/`);
}

// A redirect is a new response, so the refreshed session cookies and the
// cache headers must be copied onto it, or the user could be signed out.
function redirectWithSession(url: URL, session: NextResponse): NextResponse {
  const response = NextResponse.redirect(url);
  session.cookies.getAll().forEach((cookie) => response.cookies.set(cookie));
  for (const header of ["cache-control", "expires", "pragma"]) {
    const value = session.headers.get(header);
    if (value) response.headers.set(header, value);
  }
  return response;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and getClaims().
  // getClaims() verifies the token and refreshes it when it is close to expiring.
  const { data } = await supabase.auth.getClaims();
  const isSignedIn = Boolean(data?.claims);
  const { pathname, search } = request.nextUrl;

  if (!isSignedIn && PROTECTED_PATHS.some((path) => isPathOrChild(pathname, path))) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    url.searchParams.set("next", `${pathname}${search}`);
    return redirectWithSession(url, supabaseResponse);
  }

  if (isSignedIn && GUEST_ONLY_PATHS.some((path) => isPathOrChild(pathname, path))) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return redirectWithSession(url, supabaseResponse);
  }

  // Return this exact response object, so the refreshed cookies reach the browser.
  return supabaseResponse;
}