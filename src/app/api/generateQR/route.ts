import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import prismadb from "@/lib/prismadb";
import QRCode from "qrcode";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json(
      { success: false, message: "Unauthorized user" },
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
    const shortUrl = await prismadb.shortUrl.findUnique({
      where: { shortCode },
    });

    if (!shortUrl || shortUrl.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, message: "Short URL not found or not authorized" },
        { status: 404 }
      );
    }

    const baseUrl = process.env.NEXTAUTH_URL;
    const shortenedUrl = `${baseUrl}/${shortCode}`;

    const qrCodeDataUrl = await QRCode.toDataURL(shortenedUrl);

    const updatedShortUrl = await prismadb.shortUrl.update({
      where: { shortCode },
      data: {
        qrCode: qrCodeDataUrl,
      },
    });

    return NextResponse.json(
      {
        success: true,
        qrCode: updatedShortUrl,
        shortenedUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API] Error generating QR code:", error);
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
