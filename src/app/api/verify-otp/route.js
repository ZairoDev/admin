import { connectDb } from "@/helper/db";
import User from "@/app/projects/user/page";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDb();


export async function POST(request) {
    try{
        const reqBody = await request.json();   
        const {email, otp} = reqBody;

        const savedUser = await User.findOne({ email: email });

        if (savedUser.otpTokenExpiry < Date.now()) {
            return NextResponse.json(
                { error: "Your OTP has expired" },
                { status: 400 }
            );
        }

        if (savedUser.otpToken !== otp) {
            return NextResponse.json(
                { error: "Invalid OTP" },
                { status: 400 }
            );
        }

        await User.updateOne({ email: email }, { $set: { otpToken: undefined, otpTokenExpiry: undefined } });

        return NextResponse.json({message: "OTP verified successfully"}, {status: 200});
        
    }catch(error){
        console.log(error);
    }
}