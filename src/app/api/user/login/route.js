import { connectDb } from "../../../../helper/db";
import Users from "@/models/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../newauth/route";

connectDb();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if user exists

    const user = await Users.find({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Please Enter valid email or password" },
        { status: 400 }
      );
    }

    const bool = await user[0].isVerified;

    // Check if user is verified
    const temp = user[0];

    if (!(temp.role === "Admin" || temp.role === "SuperAdmin")) {
      return NextResponse.json(
        { error: "Only Admins can login" },
        { status: 400 }
      );
    }

    if (!temp.isVerified) {
      console.log(user.isVerified);
      return NextResponse.json(
        { error: "Please verify your email before logging in" },
        { status: 400 }
      );
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, temp.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    if (temp.role === "SuperAdmin") {
      const response = await sendEmail({
        email,
        emailType: "OTP",
        userId: temp._id,
      });

      return NextResponse.json(
        { message: "Verification OTP sent" },
        { status: 200 }
      );
    }

    // Create token data

    const tokenData = {
      id: temp._id,
      name: temp.name,
      email: temp.email,
      role: temp.role,
    };

    // Create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      token, // Include the token in the response data
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
