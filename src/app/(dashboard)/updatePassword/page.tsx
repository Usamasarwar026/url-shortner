"use client";
import Input from "@/components/input/Input";
import { IMAGES } from "@/constant/images";
import useUpdatePassword from "@/hooks/useUpdatePassword";

export default function UpdatePassword() {
  const {
    password,
    setPassword,
    newPassword,
    setNewPassword,
    handleUpdatePassword,
    loading,
  } = useUpdatePassword();

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
          Change Your Password
        </div>

        <p className="font-[300] text-[16px] text-center text-[#C9CED6] mx-7">
          You can easily updated your Password
        </p>
        <div className="text-center w-full">
          <Input
            type="password"
            placeholder="Current Password"
            className="w-[85%] md:w-[50%]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="New Password"
            className="w-[85%] md:w-[50%]"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className={`flex items-center justify-center w-[268px] h-[60px] font-semibold text-[20px] text-white bg-[#144EE3] border-[#144EE3] rounded-full hover:bg-[#273e92] transition ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <svg
                className="animate-spin h-6 w-6 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Updating...
            </div>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </div>
  );
}
