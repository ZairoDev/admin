import { Property } from '@/models/listing';
import { connectDb } from '../../../../helper/db';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// Ensure the database connection is established
connectDb();

export async function POST(request) {
  try {
    // Parse the request body to get the userId
    const reqBody = await request.json();
    const { userId } = reqBody;
    // const userId = "66b359ce265892831a5fe767";
    console.log('call in request', userId, request.body);

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Fetch all properties listed by the user with the provided userId
    const properties = await Property.find({userId: userId});
    console.log('propertiesL ', properties);

    if (!properties.length) {
      return NextResponse.json(
        { message: 'No properties found for this user' },
        { status: 404 }
      );
    }

    

    // Return the properties in the response
    return NextResponse.json({ properties }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
