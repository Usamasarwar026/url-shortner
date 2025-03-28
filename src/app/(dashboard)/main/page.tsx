"use client";
import ButtonInput from "@/components/buttonInput/ButtonInput";
import LinkBox from "@/components/linkBox/LinkBox";
import UserBox from "@/components/userBox/UserBox";
import { IMAGES } from "@/constant/images";
import useMain from "@/hooks/useMain";
import Image from "next/image";
import { FaBell } from "react-icons/fa";

export default function Main() {
  const { toggleSwitch, isToggled, handleUrl, loading, urlinput, setUrlinput } =
    useMain();
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.CUBES.src}), url(${IMAGES.SWIRL.src})`,
      }}
      className="flex flex-col  relative min-h-screen bg-cover bg-center bg-[#0B101B]"
    >
      <div className="flex justify-between items-center mt-5 mx-9 mb-[80px]">
        <div>
          <Image src={IMAGES.LINKLY} alt="Link" />
        </div>

        <div className=" w-full hidden md:hidden lg:flex justify-center ">
          <ButtonInput
            class1="block md:hidden"
            class2="hidden md:block"
            onSubmit={handleUrl}
            disabled={loading}
            placeholder="Enter the Link here"
            title="Shorten now!"
            value={urlinput}
            onChange={setUrlinput}
          />
        </div>
        <div className="flex gap-5 justify-center items-center h-[60px]">
          <div>
            <UserBox />
          </div>
          <div className="bg-[#144EE3] shadow-md p-4 rounded-full hidden md:hidden lg:block">
            <FaBell size={20} color="white" />
          </div>
        </div>
      </div>
      <div className=" w-full flex justify-center lg:hidden mb-10">
        <ButtonInput
          class1="block md:hidden"
          class2="hidden md:block"
          onSubmit={handleUrl}
          disabled={loading}
          placeholder="Enter the Link here"
          title="Shorten now!"
          value={urlinput}
          onChange={setUrlinput}
        />
      </div>
      <div className="flex flex-col gap-4 items-center justify-center ">
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
        <div className="bg-[#181E29] mx-0 w-full flex justify-center items-center text-white gap-14  ">
          <div className="flex justify-center items-center text-white gap-14  ">
            <div className="relative flex justify-center items-center gap-2 border-b-4 border-[#144EE3] p-5">
              <div className="absolute inset-x-0 top-0 h-0 shadow-[0_8px_16px_2px_#144EE3]"></div>
              <div className="flex justify-center items-center gap-2 cursor-pointer">
                <div>
                  <Image
                    width={20}
                    height={20}
                    src={IMAGES.CLOCK}
                    alt="alarm"
                  />
                </div>
                <div className="hidden md:block">History</div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 p-5 cursor-pointer">
              <div>
                <Image width={20} height={20} src={IMAGES.CHART} alt="alaram" />
              </div>
              <div className="hidden md:block">Statistics</div>
            </div>
            <div className="flex justify-center items-center gap-2 p-5 cursor-pointer">
              <div>
                <Image
                  width={20}
                  height={20}
                  src={IMAGES.SETTING}
                  alt="alaram"
                />
              </div>
              <div className="hidden md:block">Settings</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full px-10 md:px-36 text-white">
          <div>
            History <span>(401)</span>
          </div>
          <div className="flex items-center justify-center border border-[#353C4A] bg-[#181E29] py-3 px-5 rounded-full gap-2">
            <div>
              <Image src={IMAGES.FILTER} alt="filter" />
            </div>
            <div className="hidden md:block">Filter</div>
          </div>
        </div>
        <div className="w-[90%]  rounded-lg p-2 sm:p-4">
          <LinkBox />
        </div>
      </div>
    </div>
  );
}
