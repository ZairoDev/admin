import { connectDb } from "../../../../helper/db";
import User from "../../../../models/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../newauth/route";

connectDb();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Please Enter valid email or password" },
        { status: 400 }
      );
    }
    console.log("user exists", user);

    // Check if user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Please verify your email before logging in" },
        { status: 400 }
      );
    }
    console.log('here');
    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    console.log(validPassword);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }
    console.log(user);

    if (user.role === "Admin") {
      const response = await sendEmail({
        email,
        emailType: "OTP",
        userId: user._id,
      });
      console.log("Admin login mail: ", response);
      return NextResponse.json({message: "Verification OTP sent"}, {status: 200});
    }

    // Create token data
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    // Create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
