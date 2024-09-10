import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server";
import Users from "@/models/user";

connectDb();

export async function GET(request) {
    console.log(request)

    const currentPage = request.nextUrl.searchParams.get('currentPage');
    const queryType = request.nextUrl.searchParams.get('queryType');
    const userInput = request.nextUrl.searchParams.get('userInput');
    console.log(queryType);

    const query = {};
    if (userInput){
        const regex = new RegExp(userInput, 'i');
        query[queryType] = regex;
    }
    console.log(query);


    const skip = (currentPage - 1) * 20;
    console.log(currentPage);
    const allUsers = await Users.find(query).limit(20).skip(skip).sort({_id: -1});
    const totalUsers = await Users.countDocuments(query);

    console.log(totalUsers, allUsers);
    
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
