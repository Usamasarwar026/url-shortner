import SlugForm from "@/components/slugForm/SlugForm";
import UserBox from "@/components/userBox/UserBox";
import { IMAGES } from "@/constant/images";
import Image from "next/image";
import Link from "next/link";
import { FaBell } from "react-icons/fa";

export default function SlugUrl() {
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.CUBES.src}), url(${IMAGES.SWIRL.src})`,
      }}
      className="flex flex-col  relative min-h-screen bg-cover bg-center bg-[#0B101B]"
    >
      <div className="flex justify-between items-center mt-5 mx-10 mb-[80px]">
        <Link href="/main">
          <Image src={IMAGES.LINKLY} alt="Link" />
        </Link>

        <div className="flex gap-5 justify-center items-center h-[60px]">
          <div>
            <UserBox />
          </div>
          <div className="bg-[#144EE3] p-4 rounded-full">
            <FaBell size={20} color="white" />
          </div>
        </div>
      </div>
      <SlugForm />
    </div>
  );
}
