import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAppDispatch } from "./useRedux";
import { toast } from "react-toastify";
import { shortUrl } from "@/store/slice/urlSlice/urlSlice";

export default function useHome() {
  const [isToggled, setIsToggled] = useState(false);
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [urlinput, setUrlinput] = useState("");
  const dispatch = useAppDispatch();
  const toggleSwitch = () => {
    setIsToggled(!isToggled);
  };
  const handleUrl = async (url: string) => {
    if (!url) {
      setError("enter url");
      toast.error("Please enter a url?");
      return;
    }
    setError("");
    setUrlinput("");
    setLoading(true);

    try {
      const response = await dispatch(shortUrl({ url })).unwrap();
      if (response) {
        toast.success("URL shortened successfully!");
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return {
    toggleSwitch,
    isToggled,
    handleUrl,
    error,
    loading,
    session,
    status,
    urlinput,
    setUrlinput,
  };
}
