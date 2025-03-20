import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function useUserBox() {
  const { data: session, status } = useSession();
  console.log("session in useUserBox=>", session, "status=>", status);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("session updated in useUserBox=>", session); // Log on every session change
  }, [session]);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleEditProfile = () => {
    setIsDropdownOpen(false);
    router.push("/editProfile");
  };

  const handleChangePassword = () => {
    setIsDropdownOpen(false);
    router.push("/updatePassword");
  };

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await signOut({ callbackUrl: "/" });
  };
  return {
    session,
    toggleDropdown,
    isDropdownOpen,
    handleEditProfile,
    handleChangePassword,
    handleLogout,
  };
}
