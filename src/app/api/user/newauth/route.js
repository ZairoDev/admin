import nodemailer from "nodemailer";
import Users from "@/models/user";
import bcryptjs from "bcryptjs";
import {
  VerificationTemplate,
  ResetPasswordTemplate,
} from "@/app/emailTemplate/email";
import { NextResponse } from "next/server";


export const sendEmail = async ({ email, emailType, userId, password }) => {
  let otp = 999999;
  try {
    console.log("inside sendEmail");
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const encodedToken = encodeURIComponent(hashedToken); // Encode the token

    if (emailType === "VERIFY") {
      await Users.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    } else if (emailType === "RESET") {
      await Users.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    } else if (emailType === "OTP") {
      otp = Math.floor(100000 + Math.random() * 900000);
      await Users.findByIdAndUpdate(userId, {
        $set: {
          otpToken: otp,
          otpTokenExpiry: new Date(Date.now() + 300000),
        },
      })
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
      html: emailType !== "OTP" ? templateContent : `<p>${otp}</p>`,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(error.message);
  }
};
