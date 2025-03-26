import { useSession } from "next-auth/react";
import { fetchUserUrls } from "@/store/slice/urlSlice/urlSlice";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect, useState } from "react";
import { LinkData } from "@/types/types";
export default function useTrialTable() {
  const { status } = useSession();
  const dispatch = useAppDispatch();
  const { urls, loading, error } = useAppSelector(
    (state: RootState) => state.url
  );
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedUrl, setEditedUrl] = useState<string>("");
  const [editedStatus, setEditedStatus] = useState<"Active" | "Inactive">(
    "Active"
  );
  useEffect(() => {
    if (status === "unauthenticated") {
      dispatch(fetchUserUrls());
    }
  }, [status, dispatch]);
  const getFaviconUrl = (url: string): string => {
    try {
      const { hostname } = new URL(
        url.includes("://") ? url : `https://${url}`
      );
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
    } catch (error) {
      console.error("Invalid URL:", url, error);
      return "/default-favicon.png";
    }
  };
  const links: LinkData[] = urls.map((url) => ({
    shortLink: url.shortenedUrl,
    originalLink: url.originalUrl,
    clicks: url.clicks,
    date: url.createdAt,
    status: url.status,
    qrCode: url.qrCode,
  }));

  const handleCopy = (url: string, index: number) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return {
    loading,
    error,
    links,
    handleCopy,
    copiedIndex,
    getFaviconUrl,
    editIndex,
    editedUrl,
    setEditedUrl,
    editedStatus,
    setEditedStatus,
  };
}
