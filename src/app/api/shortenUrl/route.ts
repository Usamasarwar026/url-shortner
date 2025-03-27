import prismadb from "@/lib/prismadb";
import { authOptions } from "@/lib/authOption";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const cookies = req.cookies;
  const guestIdCookie = cookies.get("guestId");

  const { url, customSlug } = await req.json();

  if (!url) {
    return NextResponse.json(
      { success: false, message: "Invalid URL" },
      { status: 400 }
    );
  }
  if (!isValidUrl(url)) {
    return NextResponse.json(
      { success: false, message: "Invalid URL format" },
      { status: 400 }
    );
  }

  try {
    let shortCode = customSlug || nanoid(10);

    if (customSlug) {
      const existingSlug = await prismadb.shortUrl.findUnique({
        where: { shortCode: customSlug },
      });
      if (existingSlug) {
        return NextResponse.json(
          {
            success: false,
            message: "Custom slug is already in use. Please choose another.",
          },
          { status: 409 }
        );
      }
      shortCode = customSlug;
    }
    const baseUrl = process.env.NEXTAUTH_URL;
    const shortenedUrl = `${baseUrl}/${shortCode}`;
    const qrCodeDataUrl = await QRCode.toDataURL(shortenedUrl);
    if (session && session.user?.id) {
      await prismadb.shortUrl.create({
        data: {
          originalUrl: url,
          shortCode,
          userId: session.user.id,
          status: "Active",
          clicks: 0,
          qrCode: qrCodeDataUrl,
        },
      });
      return NextResponse.json(
        { success: true, shortenedUrl, qrCode: qrCodeDataUrl },
        { status: 200 }
      );
    } else {
      let guestId = guestIdCookie?.value;
      if (!guestId) {
        guestId = nanoid(15);
      }
      const guestUrlCount = await prismadb.shortUrl.count({
        where: { userId: guestId },
      });

      if (guestUrlCount >= 5) {
        return NextResponse.json(
          {
            success: false,
            message: "Guest limit reached. Please log in to continue.",
            showLogin: true,
          },
          { status: 403 }
        );
      }
      await prismadb.shortUrl.create({
        data: {
          originalUrl: url,
          shortCode,
          userId: guestId,
          status: "Active",
          clicks: 0,
          qrCode: qrCodeDataUrl,
        },
      });

      const response = NextResponse.json(
        { success: true, shortenedUrl, qrCode: qrCodeDataUrl },
        { status: 200 }
      );
      if (!guestIdCookie) {
        response.cookies.set("guestId", guestId, {
          httpOnly: true,
          path: "/",
          maxAge: 30 * 24 * 60 * 60,
        });
      }

      return response;
    }
  } catch (error) {
    console.error("Error creating short URL:", error);
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

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return url.startsWith("http://") || url.startsWith("https://");
  } catch {
    return false;
  }
};
