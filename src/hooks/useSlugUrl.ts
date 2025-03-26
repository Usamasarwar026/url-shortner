import { useAppDispatch } from "@/hooks/useRedux";
import { shortUrl } from "@/store/slice/urlSlice/urlSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useSlugUrl() {
  const dispatch = useAppDispatch();
  const { status } = useSession();
  const [originalUrl, setOriginalUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [error, setError] = useState("");

  const handleGenerateSlug = () => {
    setCustomSlug(nanoid(10));
  };

  const handleShortenUrl = async () => {
    if (!originalUrl) {
      setError("Please enter a URL");
      toast.error("Please enter a URL");
      return;
    }
    if (status !== "authenticated") {
      setError("You must be logged in to shorten URLs");
      toast.error("You must be logged in to shorten URLs");
      return;
    }

    setError("");
    try {
      const response = await dispatch(
        shortUrl({ url: originalUrl, customSlug })
      ).unwrap();
      if (response.success) {
        setOriginalUrl("");
        setCustomSlug("");
        toast.success("URL shortened successfully!");
      } else {
        setError(response.message || "Failed to shorten URL");
        toast.error(response.message || "Failed to shorten URL");
      }
    } catch (error) {
      let errorMessage = "Error processing request";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
      setError(errorMessage || "An unexpected error occurred");
      toast.error(errorMessage || "Slug alraedy in use");
    }
  };

  return {
    originalUrl,
    setOriginalUrl,
    customSlug,
    setCustomSlug,
    handleGenerateSlug,
    handleShortenUrl,
  };
}
