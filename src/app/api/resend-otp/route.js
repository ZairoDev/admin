import Users from "@/models/user";
import { NextResponse } from "next/server";
import { sendEmail } from "../user/newauth/route";

export async function POST(request) {

    const referer = request.headers.get("referer");
    const email = referer.split("otp/")[1];

    console.log(email);

    try{

        const user = await Users.find({email});
        console.log(user);

        const response = await sendEmail({email, emailType: "OTP", userId: user[0]._id});
        console.log(response);

        return NextResponse.json({message: "OTP sent"}, {status: 200});

    }catch(err){
        console.log(err);
        NextResponse.json({error: "OTP not sent"}, {status: 400});
    }


}