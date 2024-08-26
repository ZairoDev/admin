import { connectDb } from "../../../../helper/db";
import User from "../../../../models/user";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import { sendEmail } from "../newauth/route";

await connectDb();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {
      name,
      email,
      password,
      role,
      sendDetails,
      phone,
      gender,
      nationality,
      spokenLanguage,
      bankDetails,
      address,
      profilePic,
    } = reqBody;
    console.log('inside')
    console.log(reqBody);

    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log(hashedPassword);
    if (
      name == null ||
      email == null ||
      password == null ||
      role == null ||
      phone == null ||
      gender == null ||
      nationality == null ||
      spokenLanguage == null ||
      bankDetails == null ||
      address == null
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
        { success: false }
      );
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      gender,
      nationality,
      spokenLanguage,
      bankDetails,
      address,
      profilePic
    });

    console.log('new user: ', newUser);

    const savedUser = await newUser.save();
    console.log("saved user: ",savedUser);

    if (sendDetails) {
      console.log("inside if");
      await sendEmail({
        email,
        emailType: "VERIFY",
        userId: savedUser._id,
        password: reqBody.password,
      });
      console.log("email sent");
      return NextResponse.json({
        message:
          "User created successfully. Please check your email for verification.",
        success: true,
        savedUser,
      });
    } else {
      return NextResponse.json({
        message: "User created successfully and automatically verified.",
        success: true,
        savedUser,
      });
    }
  } catch (error) {
    console.error("Error while creating user:", error);
    return NextResponse.json(
      { error: "Error while creating user" },
      { status: 500 }
    );
  }
}
