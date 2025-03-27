"use client";
import React from "react";
import ButtonInput from "../buttonInput/ButtonInput";
import Button from "../button/Button";
import useSlugForm from "@/hooks/useSlugForm";

export default function SlugForm() {
  const {
    originalUrl,
    setOriginalUrl,
    customSlug,
    setCustomSlug,
    handleGenerateSlug,
    handleShortenUrl,
  } = useSlugForm();
  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center  w-full">
        <div className=" w-full flex justify-center">
          <ButtonInput
            class1="hidden"
            class2="hidden"
            placeholder="Enter the Link to shorten here"
            value={originalUrl}
            onChange={setOriginalUrl}
            title=""
            onSubmit={() => {}}
          />
        </div>
        <div className=" w-full flex justify-center">
          <ButtonInput
            class1="block md:hidden"
            class2="hidden md:block"
            placeholder="Enter the custom slug"
            value={customSlug}
            onChange={setCustomSlug}
            onSubmit={handleGenerateSlug}
            title="Auto Generate"
          />
        </div>
        <div className=" w-full flex justify-center">
          <Button
            onClick={handleShortenUrl}
            title="Shorten Now!"
            className="text-white text-[16px] font-semibold  hover:bg-gray-500 bg-buttonColor px-12 py-4 mr-[2px] rounded-full shadow-md"
          />
        </div>
      </div>
    </>
  );
}
