import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prismadb";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { email, username } = await req.json();
    if (!email || !username) {
      return NextResponse.json(
        { success: false, message: "Email and username are required" },
        { status: 400 }
      );
    }
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email }, 
      data: {
        username,
      },
    });
    console.log("User updated:", updatedUser);
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
      },
    });
  } catch (error) {
    console.error("Raw error:", error);
    const typedError = error instanceof Error ? error : new Error(String(error || "Unknown error"));
    console.error("Typed error details:", typedError);
    // console.error("Edit profile error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error updating profile",
        error: typedError.message,
      },
      { status: 500 }
    );
  }
}
