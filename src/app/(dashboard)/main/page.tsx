"use client";
import ButtonInput from "@/components/buttonInput/ButtonInput";
import LinkBox from "@/components/linkBox/LinkBox";
import UserBox from "@/components/userBox/UserBox";
import { IMAGES } from "@/constant/images";
import Image from "next/image";
import { useState } from "react";
import { FaBell } from "react-icons/fa";

export default function main() {
  const [isToggled, setIsToggled] = useState(false);

  const toggleSwitch = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.CUBES.src}), url(${IMAGES.SWIRL.src})`,
      }}
      className="flex flex-col  relative min-h-screen bg-cover bg-center bg-[#0B101B]"
    >
      <div className="flex justify-between items-center mt-5 mx-10 mb-[80px]">
        <div>
          <Image src={IMAGES.LINKLY} alt="Link" />
        </div>

        <div className=" w-full flex justify-center">
          <ButtonInput />
        </div>
        <div className="flex gap-5 justify-center items-center h-[60px]">
          <div>
            <UserBox />
          </div>
          <div className="bg-[#144EE3] p-4 rounded-full">
            <FaBell size={20} color="white" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center  w-full">
        <div className="flex items-center px-[30px]">
          <div
            className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 border border-[#353C4A]  bg-[#181E29]`}
            onClick={toggleSwitch}
          >
            <div
              className={`w-6 h-6 bg-[#144EE3] rounded-full shadow-md transition-transform duration-300 ${
                isToggled ? "translate-x-8" : "translate-x-0"
              }`}
            ></div>
          </div>
          <div className="text-white ml-3">Auto Paste from Clipboard</div>
        </div>
        <div className="bg-[#181E29] p-5 mx-0 w-full">
          <div className="flex justify-center items-center text-white gap-14 ">
            <div className="flex justify-center items-center gap-2">
              <div>
                <Image width={20} height={20} src={IMAGES.CLOCK} alt="alaram"/>
              </div>
              <div>History</div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div>
                <Image width={20} height={20} src={IMAGES.CHART} alt="alaram" />
              </div>
              <div>Statistics</div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div>
                <Image width={20} height={20} src={IMAGES.SETTING} alt="alaram" />
              </div>
              <div>Settings</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full px-36 text-white">
          <div>
            History <span>(401)</span>
          </div>
          <div className="flex items-center justify-center border border-[#353C4A] bg-[#181E29] py-3 px-5 rounded-full gap-2">
            <div>
              <Image src={IMAGES.FILTER} alt="filter" />
            </div>
            <div>Filter</div>
          </div>
        </div>
        <div>
          <LinkBox />
        </div>
      </div>
    </div>
  );
}
