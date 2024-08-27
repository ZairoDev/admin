"use client";
import React, { useState, useRef, useCallback } from "react";
import { Autocomplete } from "@react-google-maps/api";
import Input from "@/components/Input/Input";
const PlacesAutocomplete = ({ onPlaceSelected, countryCode }) => {
  const [address, setAddress] = useState ("");
  const autocompleteRef = useRef(null);

  const onLoad = useCallback((autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place?.place_id && place?.name && place?.formatted_address) {
        const addressComponents = place.address_components;
        console.log('address component: ', addressComponents)

        const getComponent = (type='city') =>
            console.log(type)
        //   addressComponents?.find((component) => component.types.includes(type))?.long_name || "";
          addressComponents?.find(component => component.types.includes('long_name'))?.long_name | "";
        // console.log(getComponent("country"))


        const lat = place.geometry?.location?.lat() || 0;
        const lng = place.geometry?.location?.lng() || 0;

        const selectedPlace = {
          placeId: place.place_id,
          name: place.name,
          address: place.formatted_address,
          country: getComponent("country"),
          state: getComponent("administrative_area_level_1"),
        //   city:
        //     getComponent("locality") ||
        //     getComponent("sublocality") ||
        //     getComponent("postal_town"),
        city: addressComponents[0].long_name,
          street: getComponent("route") + " " + getComponent("street_number"),
          postalCode: getComponent("postal_code"),
          lat,
          lng,
        };

        onPlaceSelected(selectedPlace);
        setAddress(place.formatted_address);
      }
    }
  }, [onPlaceSelected, countryCode]);

  return (
    <div className="w-auto">
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <Input
          type="text"
          placeholder="Enter a location"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: "100%", height: "40px" }}
          className=" bg-transparent rounded-2xl dark:text-white my-4"
        />
      </Autocomplete>
    </div>
  );
};

export default PlacesAutocomplete;
