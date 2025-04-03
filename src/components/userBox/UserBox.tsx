"use client";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import useUserBox from "@/hooks/useUserBox";

export default function UserBox() {
  const {
    session,
    toggleDropdown,
    isDropdownOpen,
    handleEditProfile,
    handleEditURL,
    handleChangePassword,
    handleLogout,
  } = useUserBox();

  return (
    <div className="relative text-white border border-[#353C4A] bg-[#181E29] h-[55px] w-40 md:h-[70px] md:w-52 rounded-full flex justify-evenly items-center gap-5 px-5">
      <div>
        <div className="text-[14px] md:text-[16px] font-bold">Welcome</div>
        <div className="text-[14px] md:text-[16px] text-center">
          {session?.user?.name ? (
            <p className="text-green-500 ">{session.user.name}</p>
          ) : (
            <p className="text-gray-500">Guest</p>
          )}
        </div>
      </div>
      <div>
        <button onClick={toggleDropdown} className="focus:outline-none">
          <IoIosArrowDown size={25} />
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute top-14 md:top-20 right-0 md:w-48 bg-[#181E29] border border-[#353C4A] rounded-lg z-10">
          <ul className="py-2">
            <li
              onClick={handleEditProfile}
              className="px-4 py-2 text-[14px] md:text-[16px] hover:bg-[#353C4A] cursor-pointer text-white"
            >
              Edit Profile
            </li>
            <li
              onClick={handleEditURL}
              className="px-4 py-2 text-[14px] md:text-[16px] hover:bg-[#353C4A] cursor-pointer text-white"
            >
              Edit URL
            </li>
            <li
              onClick={handleChangePassword}
              className="px-4 py-2 text-[14px] md:text-[16px] hover:bg-[#353C4A] cursor-pointer text-white"
            >
              Change Password
            </li>
            <li
              onClick={handleLogout}
              className="px-4 py-2 text-[14px] md:text-[16px] hover:bg-[#353C4A] cursor-pointer text-white"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
