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

    let query = {};

    if (searchTerm) {
      switch (searchType) {
        case "VSID":
          query.VSID = searchTerm;
          break;
        case "email":
          query.email = searchTerm;
          break;
        case "phone":
          query.phone = searchTerm;
          break;
        default:
          query.VSID = searchTerm;
      }
    }
    // console.log(searchTerm);
    const allProperties = await Property.find(query).skip(skip).limit(limit);
    const totalProperties = await Property.countDocuments(query);
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
