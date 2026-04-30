import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { listCloudinaryImages } from "@/lib/cloudinary";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const query = url.searchParams.get("query") || undefined;
  const cursor = url.searchParams.get("cursor") || undefined;

  try {
    const result = await listCloudinaryImages({
      query,
      nextCursor: cursor,
      maxResults: 30,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load Cloudinary assets.",
      },
      { status: 500 },
    );
  }
}
