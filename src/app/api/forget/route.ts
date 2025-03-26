import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import crypto from "crypto";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const existingUser = await prismadb.user.findUnique({ where: { email } });
    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "This Email is not registered please try a valid email",
        },
        { status: 401 }
      );
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetExpired = new Date(Date.now() + 3600000);

    await prismadb.user.update({
      where: { email },
      data: {
        resetToken: passwordResetToken,
        resetTokenExpiry: passwordResetExpired,
      },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/resetPassword?Token=${resetToken}`;
    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click ${resetLink} to reset your password. This link expires in 1 hour.</p>`,
    });

    return NextResponse.json({
      success: true,
      message: "Reset Password link has been sent successfully.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    let errorMessage = "Error processing request";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      {
        success: false,
        message: "Error processing request",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
