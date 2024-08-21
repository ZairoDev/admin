import { connectDb } from "../../../helper/db";
import { NextResponse } from "next/server";
import { Property } from "@/models/listing";

connectDb();

export async function GET(request) {
  try {
    const page = Number(request.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    const allProperties = await Property.find().skip(skip).limit(limit);
    const totalProperties = await Property.estimatedDocumentCount();
    const totalPages = Math.ceil(totalProperties / limit);

    return NextResponse.json({
      data: allProperties,
      page,
      totalPages,
      totalProperties,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch properties from the database",
      },
      { status: 500 }
    );
  }
}


