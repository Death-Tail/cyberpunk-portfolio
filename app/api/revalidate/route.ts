import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

/** POST /api/revalidate
 *  On-demand cache revalidation endpoint.
 *  Protected by a secret token stored server-side.
 *  Called by admin after any CRUD operation. */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { secret, tags } = body as { secret?: string; tags?: string[] }

    /* Verify the revalidation secret */
    const expectedSecret = process.env.REVALIDATION_SECRET
    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
    }

    /* Revalidate the requested tags */
    const tagsToRevalidate = tags ?? ["watch-entries", "read-entries", "play-entries"]
    for (const tag of tagsToRevalidate) {
      revalidateTag(tag, "max")
    }

    return NextResponse.json({
      revalidated: true,
      tags: tagsToRevalidate,
      now: Date.now(),
    })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Revalidation failed" }, { status: 500 })
  }
}
