import { connectDb } from "../../../helper/db";
import { NextResponse } from "next/server";
import { Property } from "@/models/listing";

connectDb();

export async function POST(request) {
    const {
		userId,
        email,
        propertyType,
        placeName,
        rentalForm,
        numberOfPortions,
        street,
        postalCode,
        city,
        state,
        country,
        center,
        portionName,
        portionSize,
        guests,
        bedrooms,
        beds,
        bathroom,
        kitchen,
        childrenAge,
        basePrice,
        weekendPrice,
        monthlyDiscount,
        currency,
        generalAmenities,
        otherAmenities,
        safeAmenities,
        smoking,
        pet,
        party,
        cooking,
        additionalRules,
        reviews,
        propertyCoverFileUrl,
        propertyPictureUrls,
        portionCoverFileUrls,
        portionPictureUrls,
		night,
		time,
		datesPerPortion,	

        rentalType,
        basePriceLongTerm,
        monthlyDiscountLongTerm,
        longTermMonths,

		isLive,
    } = await request.json();

    const property = new Property({
        userId,
        email,
        propertyType,
        placeName,
        rentalForm,
        numberOfPortions,
        street,
        postalCode,
        city,
        state,
        country,
        center,
        portionName,
        portionSize,
        guests,
        bedrooms,
        beds,
        bathroom,
        kitchen,
        childrenAge,
        basePrice,
        weekendPrice,
        monthlyDiscount,
        currency,
        generalAmenities,
        otherAmenities,
        safeAmenities,
        smoking,
        pet,
        party,
        cooking,
        additionalRules,
        reviews,
        propertyCoverFileUrl,
        propertyPictureUrls,
        portionCoverFileUrls,
        portionPictureUrls,
		night,
		time,
		datesPerPortion,	

        rentalType,
        basePriceLongTerm,
        monthlyDiscountLongTerm,
        longTermMonths,
        
		isLive,
    });

    try {
        const createdUser = await property.save();
        const response = NextResponse.json(createdUser, { status: 201 });
        console.log("Response: ", response);
        return response;
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json({
            message: "failed to create user from route",
        });
    }
}
