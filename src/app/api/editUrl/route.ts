import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import prismadb from "@/lib/prismadb";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { shortCode, originalUrl, status } = await req.json();
  if (!shortCode || !originalUrl || !status) {
    return NextResponse.json(
      {
        success: false,
        message: "Short code, original URL, and status are required",
      },
      { status: 400 }
    );
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return url.startsWith("http://") || url.startsWith("https://");
    } catch {
      return false;
    }
  };

  if (!isValidUrl(originalUrl)) {
    return NextResponse.json(
      { success: false, message: "Invalid URL format" },
      { status: 400 }
    );
  }

  if (!["Active", "Inactive"].includes(status)) {
    return NextResponse.json(
      { success: false, message: "Status must be 'Active' or 'Inactive'" },
      { status: 400 }
    );
  }

  try {
    const updatedUrl = await prismadb.shortUrl.update({
      where: {
        shortCode,
        userId: session.user.id,
      },
      data: {
        originalUrl,
        status,
      },
    });
    return NextResponse.json(
      { success: true, message: "URL updated successfully", updatedUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API] Error updating URL:", error);
    if (error instanceof Error && "code" in error && error.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "URL not found or not authorized" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
