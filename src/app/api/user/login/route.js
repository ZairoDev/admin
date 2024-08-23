import { connectDb } from "../../../../helper/db";
import User from "../../../../models/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
    console.log("user exists");

    // Check if user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Please verify your email before logging in" },
        { status: 400 }
      );
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }
    console.log(user);

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