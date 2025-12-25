import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  // This tells Next.js to continue to the requested page without changes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /* * Recommended: still exclude static files to save performance 
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
