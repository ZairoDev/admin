import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdCancel } from "react-icons/md";

const Step7 = ({ nextStep, prevStep }) => {
  let portions = 0;
  const data = localStorage.getItem("page3") || "";
  if (!data) {
    portions = 1;
  }
  if (data) {
    const temp = JSON.parse(data);
    const value = temp["portions"].length;
    if (value) {
      portions = parseInt(value, 10);
    }
  }

  let checkPortion = portions > 1 ? portions : 0;

  const [myArray, setMyArray] = useState(Array(checkPortion).fill(1));

  const booleanArray = Array.from({ length: portions }, () => false);
  const emptyStringArrayGenerator = (size) => {
    const emptyStringArray = Array.from({ length: size }, () => "");
    return emptyStringArray;
  };

  const [portionCoverFileUrls, setPortionCoverFileUrls] = useState(() => {
    const savedUrls = localStorage.getItem("portionCoverFileUrls");
    return savedUrls
      ? JSON.parse(savedUrls)
      : emptyStringArrayGenerator(portions);
  });

  const [propertyCoverFileUrl, setPropertyCoverFileUrl] = useState(() => {
    const savedUrls = localStorage.getItem("propertyCoverFileUrl");
    return savedUrls ? savedUrls : "";
  });

  const [portionPictureUrls, setPortionPictureUrls] = useState(() => {
    const savedUrls = localStorage.getItem("portionPictureUrls");
    const arrayOf5 = Array(5).fill("");
    return savedUrls ? JSON.parse(savedUrls) : Array(portions).fill(arrayOf5);
  });

  const [isPortionPictures, setIsPortionPictures] = useState(() => {
    const savedFlags = localStorage.getItem("isPortionPictures");
    return savedFlags ? JSON.parse(savedFlags) : Array(portions).fill(false);
  });

  const [propertyPictureUrls, setPropertyPictureUrls] = useState(() => {
    const savedUrls = localStorage.getItem("propertyPictureUrls");
    return savedUrls ? JSON.parse(savedUrls) : Array(5).fill("");
  });

  const [isPropertyPictures, setIsPropertyPictures] = useState(() => {
    const savedFlag = localStorage.getItem("isPropertyPictures");
    return savedFlag ? JSON.parse(savedFlag) : false;
  });

  const [isImages, setIsImages] = useState(() => {
    const savedFlag = localStorage.getItem("isImages");
    return savedFlag ? JSON.parse(savedFlag) : booleanArray;
  });

  useEffect(() => {
    localStorage.setItem("propertyCoverFileUrl", propertyCoverFileUrl);
  }, [propertyCoverFileUrl]);

  useEffect(() => {
    localStorage.setItem(
      "portionPictureUrls",
      JSON.stringify(portionPictureUrls)
    );
  }, [portionPictureUrls]);

  useEffect(() => {
    localStorage.setItem(
      "isPortionPictures",
      JSON.stringify(isPortionPictures)
    );
  }, [isPortionPictures]);

  useEffect(() => {
    localStorage.setItem(
      "propertyPictureUrls",
      JSON.stringify(propertyPictureUrls)
    );
  }, [propertyPictureUrls]);

  useEffect(() => {
    localStorage.setItem(
      "isPropertyPictures",
      JSON.stringify(isPropertyPictures)
    );
  }, [isPropertyPictures]);

  useEffect(() => {
    localStorage.setItem(
      "portionCoverFileUrls",
      JSON.stringify(portionCoverFileUrls)
    );
  }, [portionCoverFileUrls]);

  useEffect(() => {
    localStorage.setItem("isImages", JSON.stringify(isImages));
  }, [isImages]);

  const [propertyCoverFileLoading, setPropertyCoverFileLoading] =
    useState(false);
  const [propertyPicturesLoading, setPropertyPicturesLoading] = useState(false);
  const [portionCoverFileLoading, setPortionCoverFileLoading] = useState(
    Array.from({ length: checkPortion }, () => false)
  );
  const [portionPicturesLoading, setPortionPicturesLoading] = useState(
    Array.from({ length: checkPortion }, () => false)
  );

  let placeName = JSON.parse(localStorage.getItem("page1") || "").placeName;
  placeName = placeName.toLowerCase();
  placeName = placeName.split(" ");
  placeName = placeName.join("_");

  const uploadFile = async (event, index) => {
    setPortionCoverFileLoading((prev) => {
      const newArray = [...prev];
      newArray[index] = true;
      return newArray;
    });
    const file = event?.target.files[0];

    if (
      !file ||
      !(
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp"
      )
    ) {
      alert("Error: Only PNG and JPEG files are allowed.");
      return;
    }

    const storageZoneName = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE;
    const accessKey = process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY;
    const storageUrl = process.env.NEXT_PUBLIC_BUNNY_STORAGE_URL;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.put(
        `${storageUrl}/${storageZoneName}/${placeName}/${file.name}`,
        file,
        {
          headers: {
            AccessKey: accessKey,
            "Content-Type": file.type,
          },
        }
      );

      console.log("response: ", response);
      const imageUrl = `https://vacationsaga.b-cdn.net/${placeName}/${file.name}`;

      setPortionCoverFileUrls((prevState) => {
        const newUrls = [...prevState];
        newUrls[index] = imageUrl;
        return newUrls;
      });

      setIsImages((prevState) => {
        const newImages = [...prevState];
        newImages[index] = true;
        return newImages;
      });
    } catch (error) {
      console.error("Error uploading image to Bunny CDN:", error);
      alert("Error uploading image. Please try again.");
    }

    setPortionCoverFileLoading((prev) => {
      const newArray = [...prev];
      newArray[index] = false;
      return newArray;
    });
  };

  const uploadPropertyCoverFile = async (event) => {
    setPropertyCoverFileLoading(true);
    const file = event?.target.files[0];

    if (
      !file ||
      !(
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp"
      )
    ) {
      alert("Error: Only PNG and JPEG files are allowed.");
      return;
    }

    const storageZoneName = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE;
    const accessKey = process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY;
    const storageUrl = process.env.NEXT_PUBLIC_BUNNY_STORAGE_URL;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.put(
        `${storageUrl}/${storageZoneName}/${placeName}/${file.name}`,
        file,
        {
          headers: {
            AccessKey: accessKey,
            "Content-Type": file.type,
          },
        }
      );

      console.log("response: ", response);
      const imageUrl = `https://vacationsaga.b-cdn.net/${placeName}/${file.name}`;

      setPropertyCoverFileUrl(imageUrl);
    } catch (error) {
      console.error("Error uploading image to Bunny CDN:", error);
      alert("Error uploading image. Please try again.");
    }
    setPropertyCoverFileLoading(false);
  };

  const uploadPortionPictures = async (event, index) => {
    setPortionPicturesLoading((prevState) => {
      const newLoading = [...prevState];
      newLoading[index] = true;
      return newLoading;
    });
    const files = event?.target.files;

    for (let i = 0; i < files.length; i++) {
      if (
        !(
          files[i].type === "image/png" ||
          files[i].type === "image/jpeg" ||
          files[i].type === "image/webp"
        )
      ) {
        alert("Error: Only PNG and JPEG files are allowed.");
        return;
      }
    }

    const storageZoneName = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE;
    const accessKey = process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY;
    const storageUrl = process.env.NEXT_PUBLIC_BUNNY_STORAGE_URL;

    const formData = new FormData();

    const updatedUrls = [...portionPictureUrls];
    const newImages = [...isPortionPictures];

    for (let i = 0; i < 5; i++) {
      formData.append("file", files[i]);
      try {
        const response = await axios.put(
          `${storageUrl}/${storageZoneName}/${placeName}/${files[i].name}`,
          files[i],
          {
            headers: {
              AccessKey: accessKey,
              "Content-Type": files[i].type,
            },
          }
        );

        console.log("response: ", response);
        const imageUrl = `https://vacationsaga.b-cdn.net/${placeName}/${files[i].name}`;

        updatedUrls[index] = [...updatedUrls[index]];
        updatedUrls[index][i] = imageUrl;
      } catch (error) {
        console.error("Error uploading image to Bunny CDN:", error);
        alert("Error uploading image. Please try again.");
      }
    }
    newImages[index] = true;
    setPortionPictureUrls(updatedUrls);
    setIsPortionPictures(newImages);

    setPortionPicturesLoading((prevState) => {
      const newLoading = [...prevState];
      newLoading[index] = false;
      return newLoading;
    });
  };

  const uploadPropertyPictures = async (event) => {
    setPropertyPicturesLoading(true);
    const files = event?.target.files;

    for (let i = 0; i < files.length; i++) {
      if (
        !(
          files[i].type === "image/png" ||
          files[i].type === "image/jpeg" ||
          files[i].type === "image/webp"
        )
      ) {
        alert("Error: Only PNG and JPEG files are allowed.");
        return;
      }
    }

    const storageZoneName = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE;
    const accessKey = process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY;
    const storageUrl = process.env.NEXT_PUBLIC_BUNNY_STORAGE_URL;

    const formData = new FormData();

    const savedUrls = [...propertyPictureUrls];

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
      try {
        const response = await axios.put(
          `${storageUrl}/${storageZoneName}/${placeName}/${files[i].name}`,
          files[i],
          {
            headers: {
              AccessKey: accessKey,
              "Content-Type": files[i].type,
            },
          }
        );

        console.log("response: ", response);
        const imageUrl = `https://vacationsaga.b-cdn.net/${placeName}/${files[i].name}`;

        savedUrls[i] = imageUrl;
      } catch (error) {
        console.error("Error uploading image to Bunny CDN:", error);
        alert("Error uploading image. Please try again.");
      }
    }

    setPropertyPictureUrls(savedUrls);
    setIsPropertyPictures(true);
    setPropertyPicturesLoading(false);
  };
  const handleNext = () => {
    nextStep();
  };
  return (
    <>
      <div className="flex flex-col gap-20">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl my-2 mx-2 font-semibold">
              Cover Image of property
            </h2>

            <div className="mt-5 ">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                <div className="space-y-1 text-center flex flex-col items-center">
                  {propertyCoverFileUrl.length < 1 ? (
                    <svg
                      className="mx-auto h-12 w-12 text-neutral-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  ) : (
                    <div>
                      <MdCancel
                        className=" text-right ml-auto text-xl cursor-pointer"
                        onClick={() => setPropertyCoverFileUrl("")}
                      />
                      <div className="flex flex-wrap gap-2">
                        {/* <img
                        src={propertyCoverFileUrl}
                        className="w-48 h-48 rounded-lg"
                      /> */}
                        {/* <Image src={propertyCoverFileUrl} alt="" className="w-48 h-48 rounded-lg" width={200} height={200} /> */}
                        <img
                          src={propertyCoverFileUrl}
                          alt="Cover Image"
                          className="w-48 h-48 rounded-lg"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                    <label
                      htmlFor={`file-upload`}
                      className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span className="text-center">Upload a file</span>
                      <input
                        id={`file-upload`}
                        name={`file-upload`}
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => uploadPropertyCoverFile(e)}
                      />
                    </label>
                    {/* <p className="pl-1">or drag and drop</p> */}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ---------------- */}
          <div>
            <span className="text-lg font-semibold">
              Pictures of the Property
            </span>
            <div className="mt-5 ">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {!isPropertyPictures ? (
                    <svg
                      className="mx-auto h-12 w-12 text-neutral-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  ) : (
                    <div className="flex flex-col items-center">
                      <MdCancel
                        className=" text-center text-2xl cursor-pointer mb-2"
                        onClick={() => {
                          const emptyArray = emptyStringArrayGenerator(5);
                          setPropertyPictureUrls(emptyArray);
                          setIsPropertyPictures(false);
                        }}
                      />
                      <div className=" flex gap-2 w-full">
                        {Array.from({ length: 5 }, () => "").map((_, i) => (
                          <div className="flex flex-wrap gap-4 mx-2" key={i}>
                            <img
                              src={propertyPictureUrls[i]}
                              alt="Property Pictures"
                              className="w-28 h-28 object-contain rounded-lg  border border-gray-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex text-sm text-neutral-6000 dark:text-neutral-300 justify-center">
                    <label
                      htmlFor="file-upload-2"
                      className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span className=" text-center ">Upload a file</span>
                      <input
                        id="file-upload-2"
                        name="file-upload-2"
                        type="file"
                        className="sr-only"
                        multiple
                        accept="image/*"
                        onChange={(e) => uploadPropertyPictures(e)}
                      />
                    </label>
                    {/* <p className="pl-1">or drag and drop</p> */}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {myArray.map((item, index) => (
          <div key={index}>
            <div>
              <h2 className="text-2xl font-semibold">
                {/* <span>{index}</span>Pictures of the place */}
                <span>Portion {index + 1}</span>
              </h2>
              <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                A few beautiful photos will help customers have more sympathy
                for your property.
              </span>
            </div>

            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            {/* FORM */}
            <div className="space-y-8">
              <div>
                <span className="text-lg font-semibold">Cover image</span>
                {/* <div>
                <h1>Image Upload</h1>
              </div> */}
                <div className="mt-5 ">
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                    <div className="space-y-1 text-center flex flex-col items-center">
                      {!isImages[index] ? (
                        <svg
                          className="mx-auto h-12 w-12 text-neutral-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      ) : (
                        <div>
                          <MdCancel
                            className=" text-right ml-auto text-xl cursor-pointer"
                            onClick={() => {
                              setIsImages((prev) => [
                                ...prev.slice(0, index),
                                false,
                                ...prev.slice(index + 1, prev.length),
                              ]);
                              setPortionCoverFileUrls((prev) => {
                                const newCoverFileUrls = [...prev];
                                newCoverFileUrls[index] = "";
                                return newCoverFileUrls;
                              });
                            }}
                          />
                          <div className="flex flex-wrap gap-2">
                            <img
                              src={portionCoverFileUrls[index]}
                              alt="Portion Cover Image"
                              className="w-408 h-48 object-contain rounded-lg"
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                        <label
                          htmlFor={`file-upload-${index}`}
                          className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                        >
                          <span className="text-center">Upload a file</span>
                          <input
                            id={`file-upload-${index}`}
                            name={`file-upload-${index}`}
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => uploadFile(e, index)}
                            // onClick={(e) => uploadFile(e, index)}
                          />
                        </label>
                        {/* <p className="pl-1">or drag and drop</p> */}
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* ---------------- */}
              <div>
                <span className="text-lg font-semibold">
                  Pictures of the Portions
                </span>
                <div className="mt-5">
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {!isPortionPictures[index] ? (
                        <svg
                          className="mx-auto h-12 w-12 text-neutral-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      ) : (
                        <div className="flex flex-col items-center">
                          <MdCancel
                            className=" text-center text-2xl cursor-pointer mb-2"
                            onClick={() => {
                              setPortionPictureUrls((prev) => {
                                const newPortionPictureUrls = [...prev];
                                newPortionPictureUrls[index] =
                                  emptyStringArrayGenerator(5);
                                return newPortionPictureUrls;
                              });
                              setIsPortionPictures((prev) => {
                                const newPortionArray = [...prev];
                                newPortionArray[index] = false;
                                return newPortionArray;
                              });
                            }}
                          />
                          <div className=" flex gap-2 w-full">
                            {Array.from({ length: 5 }, () => "").map((_, i) => (
                              <div
                                className="flex flex-wrap gap-4 mx-2"
                                key={i}
                              >
                                <img
                                  src={portionPictureUrls[index][i]}
                                  alt="Portion Pictures"
                                  className="w-28 h-28 object-contain rounded-lg  border border-gray-500"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex text-sm text-neutral-6000 dark:text-neutral-300 justify-center">
                        <label
                          htmlFor="file-upload-2"
                          className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                        >
                          <span className="text-sm text-center">Upload a file</span>
                          <input
                            id="file-upload-2"
                            name="file-upload-2"
                            type="file"
                            className="sr-only"
                            multiple
                            accept="image/*"
                            onChange={(e) => uploadPortionPictures(e, index)}
                          />
                        </label>
                        {/* <p className="pl-1">or drag and drop</p> */}
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mb-4 items-center gap-x-4">
        <button
          className="max-w-[200px] w-full mt-10 text-white dark:text-white bg-PrimaryColor hover:bg-PrimaryColor/90 focus:ring-4 focus:ring-PrimaryColor/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="max-w-[200px] w-full mt-10 text-white dark:text-white bg-PrimaryColor hover:bg-PrimaryColor/90 focus:ring-4 focus:ring-PrimaryColor/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Step7;
