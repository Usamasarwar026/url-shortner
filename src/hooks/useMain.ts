import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector} from "./useRedux";
import { shortUrl } from "@/store/slice/urlSlice/urlSlice";

export default function useMain() {
  const [isToggled, setIsToggled] = useState(false);
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [urlinput, setUrlinput] = useState("");
  const dispatch = useAppDispatch();
  const { urls } = useAppSelector((state) => state.url);
  const toggleSwitch = () => {
    setIsToggled(!isToggled);
  };


  const TotalUrl = urls.length;
  const handleUrl = async (url: string) => {
    if (!url) {
      setError("enter url");
      toast.error("Please enter a url?");
      return;
    }
    if (status !== "authenticated") {
      setError("You must be logged in to shorten URLs");
      toast.error("You must be logged in to shorten URLs");

      return;
    }

    setError("");
    setUrlinput("");
    setLoading(true);

    try {
      const response = await dispatch(shortUrl({url})).unwrap();
      if (response.success) {
        toast.success("URL shortened successfully!");
      } else {
        setError(response.error || "Failed to shorten URL");
      }
    } catch (error) {
      console.error("[useMain] Error shortening URL:", error);
      setError("An unexpected error occurred");
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
    TotalUrl
  };
}
