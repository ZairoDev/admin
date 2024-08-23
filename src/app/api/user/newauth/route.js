import nodemailer from "nodemailer";
import Users from "@/models/user";
import bcryptjs from "bcryptjs";
import {
  VerificationTemplate,
  ResetPasswordTemplate,
} from "@/app/emailTemplate/email";
import { NextResponse } from "next/server";

export const sendEmail = async ({ email, emailType, userId, password }) => {
  try {
    console.log('inside sendEmail')
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const encodedToken = encodeURIComponent(hashedToken); // Encode the token

    if (emailType === "VERIFY") {
      console.log('verify');
      await Users.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
      console.log('verified');
    } else if (emailType === "RESET") {
      await Users.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "no-reply@vacationsaga.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    let templateContent;
    if (emailType === "VERIFY") {
      templateContent = VerificationTemplate(encodedToken, password, email);
    } else if (emailType === "RESET") {
      templateContent = ResetPasswordTemplate(encodedToken);
    }

    const mailOptions = {
      from: "No Reply <no-reply@vacationsaga.com>",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset Your Password",
      html: templateContent,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(error.message);
  }
};
