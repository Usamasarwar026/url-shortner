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
    handleChangePassword,
    handleLogout,
  } = useUserBox();
  return (
    <div className="relative text-white border border-[#353C4A] bg-[#181E29] h-20 w-52 rounded-full flex justify-evenly items-center gap-5 px-5">
      <div>
        <div>Welcome</div>
        <div className="text-[16px] font-bold text-center">
          {session?.user?.name ? (
            <p className="text-green-500 ">{session.user.name}</p>
          ) : (
            <p className="text-gray-500">Guest</p>
          )}
        </div>
      </div>
      <div>
        <button onClick={toggleDropdown} className="focus:outline-none">
          <IoIosArrowDown size={30} />
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute top-20 right-0 mt-2 w-48 bg-[#181E29] border border-[#353C4A] rounded-lg shadow-lg z-10">
          <ul className="py-2">
            <li
              onClick={handleEditProfile}
              className="px-4 py-2 hover:bg-[#353C4A] cursor-pointer text-white"
            >
              Edit Profile
            </li>
            <li
              onClick={handleChangePassword}
              className="px-4 py-2 hover:bg-[#353C4A] cursor-pointer text-white"
            >
              Change Password
            </li>
            <li
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-[#353C4A] cursor-pointer text-white"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
