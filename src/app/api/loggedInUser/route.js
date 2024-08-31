import { connectDb } from "../../../helper/db";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "../../../models/user";
import { NextResponse} from "next/server";

connectDb();

export async function POST(request) {
	console.log('here');
  const userId = await getDataFromToken(request);
	console.log(userId);
  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "User found ",
    data: user,
  });
}
