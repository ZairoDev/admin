import { connectDb } from "../../../helper/db";
import { NextResponse } from "next/server";
import { Property } from "@/models/listing";

connectDb();

export async function GET(request) {
  try {
    const page = Number(request.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;
    const searchTerm = request.nextUrl.searchParams.get("searchTerm");
    const searchType = request.nextUrl.searchParams.get("searchType") || "VSID";

    const regex = new RegExp(searchTerm, "i");
    let query = {};

    if (searchTerm) {
      query[searchType] = regex;
    }

    let allProperties;

    if (!searchTerm) {
      allProperties = await Property.find().skip(skip).limit(limit).sort({_id: -1});;
    } else {
      allProperties = await Property.find(query).sort({_id: -1});;
    }

    if (allProperties.length === 0) {
      const totalCount = await Property.countDocuments();
      console.log("Total properties in database:", totalCount);
    }
    const totalProperties = await Property.countDocuments(query);
    const totalPages = Math.ceil(totalProperties / limit);

    return NextResponse.json({
      data: allProperties,
      page,
      totalPages,
      totalProperties,
    });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch properties from the database",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
