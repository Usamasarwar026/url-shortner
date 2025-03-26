import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import prismadb from "@/lib/prismadb";

interface PrismaError extends Error {
  code?: string;
}
function isPrismaError(error: Error): error is PrismaError {
  return 'code' in error;
}
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { shortCode } = await req.json();
  if (!shortCode) {
    return NextResponse.json(
      { success: false, message: "Short code is required" },
      { status: 400 }
    );
  }

  try {
    const deletedUrl = await prismadb.shortUrl.delete({
      where: {
        shortCode,
        userId: session.user.id,
      },
    });
    return NextResponse.json(
      { success: true, message: "URL deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API] Error deleting URL:", error);
    if (error instanceof Error && isPrismaError(error) && error.code === "P2025") {
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
