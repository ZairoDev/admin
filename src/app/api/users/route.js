import { connectDb } from "../../../helper/db";
import { NextResponse } from "next/server";
import Users from "@/models/user";

connectDb();

export async function GET() {
    const allUsers = await Users.find({}); 
    const totalUsers = await Users.countDocuments();

    try {
        console.log('inside try', totalUsers)
        return NextResponse.json({allUsers, totalUsers});
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json({
            message: "failed to fetch user from route",
        });
    }
}
