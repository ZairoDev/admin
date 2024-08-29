import nodemailer from "nodemailer";
import { sendEmail } from "../user/newauth/route";
import { connectDb } from "@/helper/db";
import User from "@/app/projects/user/page";
import Redis from 'ioredis';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDb();

export default async function handler(req, res) {
  try {
    const reqBody = await request.json();
    const { email, password} = reqBody;
    console.log(reqBody);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Please Enter valid email" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

		if (!user.role === "admin") {
      return NextResponse.json(
        { error: "You are not an Admin" },
        { status: 400 }
      );
    }

		await sendEmail({
			email,
			emailType: "OTP",
			userId: user._id,
			password: password
		});

	} catch (error) {
		console.log(error);
	}

  res.status(200).json({ message: "OTP sent" });
}
