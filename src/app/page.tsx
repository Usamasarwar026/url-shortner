"use client";
import Button from "@/components/button/Button";
import ButtonInput from "@/components/buttonInput/ButtonInput";
import TrialTable from "@/components/trialTable/TrialTable";
import { IMAGES } from "@/constant/images";
import useHome from "@/hooks/useHome";
import Image from "next/image";
import Link from "next/link";
import { GoQuestion } from "react-icons/go";

export default function Home() {
  const { toggleSwitch, isToggled, handleUrl, loading, urlinput, setUrlinput } =
    useHome();
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
        <div className="flex gap-5">
          <Link
            href="/login"
            className="flex items-center gap-3 text-white text-[16px] font-semibold hover:bg-gray-500 bg-[#181E29] border border-[#353C4A] px-7 py-3 rounded-full"
          >
            Login
            <Image
              src={IMAGES.SIGNIN}
              alt="Login Icon"
              width={20}
              height={20}
            />
          </Link>
          <Link href="/register" className="hidden md:block lg:block">
            <Button
              title="Register"
              className="text-white text-2xl text-[16px] font-semibold  hover:bg-gray-500 bg-buttonColor px-12 py-3 rounded-full shadow-md"
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center px-[30px] w-full">
        <div className="font-[800] text-[35px] md:text-[50px] bg-custom-gradient text-center text-transparent bg-clip-text">
          Shorten Your Loooong Links :)
        </div>

        <div className="font-[300] text-[14px] md:text-[16px] text-center text-[#C9CED6]">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </div>
        <div className=" w-full flex justify-center">
          <ButtonInput
            class1="block md:hidden"
            class2="hidden md:block"
            placeholder="Enter the link here"
            title="Shorten Now!"
            onSubmit={handleUrl}
            disabled={loading}
            value={urlinput}
            onChange={setUrlinput}
          />
        </div>
        <div className="flex items-center">
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
          <div className="text-white ml-3 text-[14px] md:text-[16px]">Auto Paste from Clipboard</div>
        </div>
        <div className="flex items-center justify-center flex-wrap px-5">
          <div className="text-white text-center text-[14px] md:text-[16px]">
            You can create <span className="text-[#EB568E] font-bold">05</span>{" "}
            more links.
          </div>
          <div className="text-white">
            <Link
              href="./register"
              className="mx-1 font-bold underline  md:font-normal md:no-underline "
            >
              Register Now
            </Link>
            to enjoy Unlimited usage
          </div>
          <div className="hidden md:block ml-2">
            <GoQuestion color="white" />
          </div>
        </div>
      </div>
      <div className="w-[90%] rounded-lg p-2 sm:p-4 mx-auto mt-10 mb-9">
        <TrialTable />
      </div>
      <div className="overflow-x-auto fixed bottom-0 left-0 right-0 z-50 text-sm text-gray-400 text-center py-4 bg-[#181E29]/20 backdrop-blur-sm">
       
        <Link href="./signup" className="text-blue-500 hover:underline">
          Register
        </Link>
        {" "}to enjoy Unlimited History?
      </div>
    </div>
  );
}
