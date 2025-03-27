import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import prismadb from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const cookies = req.cookies;
  const guestId = cookies.get("guestId")?.value;

  if (!session && !guestId) {
    return NextResponse.json(
      { success: false, message: "No session or guest ID found" },
      { status: 401 }
    );
  }

  try {
    const userId = session?.user?.id || guestId;
    const shortUrls = await prismadb.shortUrl.findMany({
      where: {
        userId: userId,
      },
    });
    const baseUrl = process.env.NEXTAUTH_URL;
    const links = shortUrls.map((url) => ({
      shortenedUrl: `${baseUrl}/${url.shortCode}`,
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      createdAt: url.createdAt.toISOString().split("T")[0],
      status: url.status,
      qrCode: url.qrCode,
    }));
    return NextResponse.json({ success: true, links }, { status: 200 });
  } catch (error) {
    console.error("[API] Error fetching user links:", error);
    let errorMessage = "Error processing request";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
