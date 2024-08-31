import { connectDb } from "@/helper/db";
import { Property } from "@/models/listing";

connectDb();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { propertyId, updatedData, userEmail } = reqBody;
    console.log(userEmail, propertyId, updatedData);

    const {lastUpdatedBy} = {...updatedData};
    console.log(lastUpdatedBy);
    if (lastUpdatedBy){
      lastUpdatedBy.push(userEmail);
      console.log(lastUpdatedBy);
      console.log(updatedData);
      updatedData.lastUpdatedBy = lastUpdatedBy;
      console.log(updatedData);
    }else{
      console.log('else');
    }

    console.log(updatedData);
    delete updatedData.VSID;
    console.log(updatedData);

    if (!propertyId || !updatedData) {
      return new Response(
        JSON.stringify({
          error: "Property ID, updated data, and user ID are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    console.log("here");
    // const pId = new ObjectId(propertyId);
    console.log(updatedData);
    const property = await Property.findOneAndUpdate(
      { _id: propertyId },
      { $set: updatedData},
      { new: true }
    );

    if (!property) {
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ property }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
