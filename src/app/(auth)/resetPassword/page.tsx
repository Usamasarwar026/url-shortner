import ResetForm from "@/components/resetForm/ResetForm";
import { IMAGES } from "@/constant/images";

export default function ResetPassword() {
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.CUBES.src}), url(${IMAGES.SWIRL.src})`,
      }}
      className="relative min-h-screen bg-cover bg-center bg-[#0B101B] flex flex-col items-center justify-around"
    >
      <div className=" pl-[52px] pr-[55px] pt-[20px] w-full flex items-center justify-center ">
        <h2 className=" text-center bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text font-extrabold text-[36.91px] leading-[45.44px]">
          Linkly
        </h2>
      </div>
      <div className="flex flex-col gap-4 items-center w-full">
        <div className="font-[800] text-[40px] md:text-[50px] bg-custom-gradient text-center text-transparent bg-clip-text">
          Reset Your Password
        </div>

        <p className="font-[300] text-[16px] text-center text-[#C9CED6] mx-7">
          You can easily Reset your Password
        </p>
        <ResetForm/>
      </div>
    </div>
  );
}
