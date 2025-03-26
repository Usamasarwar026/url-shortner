import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useUserBox() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleEditProfile = () => {
    setIsDropdownOpen(false);
    router.push("/editProfile");
  };
  const handleEditURL = () => {
    setIsDropdownOpen(false);
    router.push("/slugUrl");
  };

  const handleChangePassword = () => {
    setIsDropdownOpen(false);
    router.push("/updatePassword");
  };

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await signOut({ 
      redirect: false,
      callbackUrl: "/" 
    });
    window.location.href = "/";
  };
  return {
    session,
    toggleDropdown,
    isDropdownOpen,
    handleEditProfile,
    handleEditURL,
    handleChangePassword,
    handleLogout,
  };
}
