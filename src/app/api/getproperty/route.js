import { connectDb } from "@/helper/db";
import { Property } from "@/models/listing";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request) {
    console.log(request)
  const propertyData = await request.json();
  console.log(propertyData);
  const { id } = propertyData;

  try {
    const prop = await Property.findById(id);
    return NextResponse.json(prop);
  } catch (error) {
    console.log("error: ", error);
  }
};
