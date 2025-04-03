import LoginForm from "@/components/loginForm/LoginForm";
import { IMAGES } from "@/constant/images";
import Link from "next/link";

export default function Login() {
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.CUBES.src}), url(${IMAGES.SWIRL.src})`,
      }}
      className="relative min-h-screen bg-cover bg-center bg-[#0B101B] flex flex-col items-center justify-between"
    >
      <div className=" pl-[52px] pr-[55px] pt-[20px]  w-full  flex items-center justify-center ">
        <h2 className=" text-center bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text font-extrabold text-[36.91px] leading-[45.44px]">
          Linkly
        </h2>
      </div>
      <div className="flex flex-col gap-4  items-center justify-center  w-full">
        <div className="font-[800] text-[35px] md:text-[50px] bg-custom-gradient  text-center text-transparent bg-clip-text">
          Shorten Your Loooong Links :)
        </div>

        <p className="font-[300] text-[14px] md:text-[16px] text-center  text-[#C9CED6]">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>
        <LoginForm />
      </div>
      <div className="flex justify-center items-center mb-5">
        <Link href="/forgetPassword" className="text-[#144EE3] underline ">
          Reset Password
        </Link>
      </div>
      <div className="flex justify-center items-center mb-5">
        <span className="text-[#C9CED6]">
          <Link href="/register" className="text-[#144EE3] underline ">
            Register
          </Link>{" "}
          if not already registered
        </span>
      </div>
    </div>
  );
}
