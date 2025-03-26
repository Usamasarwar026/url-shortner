import { IMAGES } from "@/constant/images";
import Image from "next/image";
import React, { useState } from "react";
import Input from "../input/Input";
import Button from "../button/Button";
import { FaArrowRight, FaLink } from "react-icons/fa";
import { ButtonInputProps } from "@/types/types";

export default function ButtonInput({class1,
  class2,
  placeholder,
  value,
  title,
  onChange,
  disabled,
  onSubmit}: ButtonInputProps) {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled) {
      onSubmit(value);
  
    }
  };
  return (
    <div className="flex items-center justify-between border-4 border-[#353C4A] rounded-full bg-[#181E29] text-center h-[68px] w-[85%] md:w-[590px]  ">
      <div className="flex-grow flex items-center ">
        <div className="flex-shrink-0 ml-5">
          <Image src={IMAGES.LINK} width={20} alt="Link" />
        </div>
        <div className="mt-3 flex-grow">
          <Input
            type="text"
            placeholder={placeholder}
            border="none"
            className="bg-none bg-transparent flex-grow w-full"
            value={value}
            onChange={(e)=>onChange(e.target.value)}
          />
        </div>
      </div>
      <div className=" flex-shrink-0 ">
      <div className={`${class1} `}  onClick={handleSubmit}>
        <div
          className="bg-buttonColor p-5 mr-[2px] rounded-full flex items-center justify-center"
          
        >
          <FaArrowRight className="text-white text-lg" />
        </div>
      </div>
      <div className={`${class2} `} onClick={handleSubmit}>
        <Button
          title={title}
          className="text-white text-[16px] font-semibold  hover:bg-gray-500 bg-buttonColor px-12 py-4 mr-[2px] rounded-full shadow-md"
        />
      </div>
      </div>
    </div>
  );
}
