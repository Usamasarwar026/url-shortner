
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: NextRequest, { params }: { params: { shortCode: string } }) {
  const { shortCode } = params;

  try {
    const url = await prismadb.shortUrl.findUnique({
      where: { shortCode },
    });

    if (!url) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }

    if (url.status === "Inactive") {
      return NextResponse.json(
        { error: "This URL is inactive and cannot be accessed" },
        { status: 403 }
      );
    }

    await prismadb.shortUrl.update({
      where: { shortCode },
      data: { clicks: { increment: 1 } },
    });

    return NextResponse.redirect(url.originalUrl);
  } catch (error) {
    console.error("[Redirect] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}