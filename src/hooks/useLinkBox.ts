import { useSession } from "next-auth/react";
import {
  deleteUrl,
  editUrl,
  fetchUserUrls,
} from "@/store/slice/urlSlice/urlSlice";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/hooks/useRedux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LinkData } from "@/types/types";
import { toast } from "react-toastify";
export default function useLinkBox() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { urls, loading, error } = useSelector((state: RootState) => state.url);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedUrl, setEditedUrl] = useState<string>("");
  const [editedStatus, setEditedStatus] = useState<"Active" | "Inactive">(
    "Active"
  );
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [copiedQrIndex, setCopiedQrIndex] = useState<number | null>(null);

  useEffect(() => {
    if (session?.user.id) {
      dispatch(fetchUserUrls());
    }
  }, [session, dispatch]);

  const links: LinkData[] = urls.map((url) => ({
    shortLink: url.shortenedUrl,
    originalLink: url.originalUrl,
    clicks: url.clicks,
    date: url.createdAt,
    status: url.status,
    qrCode: url.qrCode ?? "",
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

  const handleCopyQr = (qrCode: string, index: number) => {
    navigator.clipboard
      .writeText(qrCode)
      .then(() => {
        setCopiedQrIndex(index);
        toast.success("QR Code URL copied to clipboard!");
        setTimeout(() => setCopiedQrIndex(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy QR code:", err);
        toast.error("Failed to copy QR code URL");
      });
  };

  const handleEdit = (
    index: number,
    originalLink: string,
    status: "Active" | "Inactive"
  ) => {
    setEditIndex(index);
    setEditedUrl(originalLink);
    setEditedStatus(status);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedUrl("");
    setEditedStatus("Active");
  };

  const handleSave = (shortLink: string) => {
    const shortCode = shortLink.split("/").pop();
    if (!shortCode) {
      toast.error("Invalid short link format");
      return;
    }
    dispatch(
      editUrl({
        shortCode,
        originalUrl: editedUrl,
        status: editedStatus,
      })
    ).then((result) => {
      if (editUrl.fulfilled.match(result)) {
        toast.success("URL updated successfully");
        setEditIndex(null);
        dispatch(fetchUserUrls());
      } else {
        toast.error((result.payload as string) || "Failed to edit URL");
      }
    });
  };

  const handleDelete = (shortLink: string) => {
    if (window.confirm(`Are you sure you want to delete ${shortLink}?`)) {
      const shortCode = shortLink.split("/").pop();
      if (!shortCode) {
        toast.error("Invalid short link format");
        return;
      }
      dispatch(deleteUrl(shortCode)).then((result) => {
        if (deleteUrl.fulfilled.match(result)) {
          toast.success("URL deleted successfully");
          dispatch(fetchUserUrls());
        } else {
          toast.error((result.payload as string) || "Failed to delete URL");
        }
      });
    }
  };

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
  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const isLoggedIn = !!session?.user;
  return {
    loading,
    error,
    isLoggedIn,
    links,
    handleCopy,
    copiedIndex,
    editIndex,
    editedUrl,
    setEditedUrl,
    editedStatus,
    setEditedStatus,
    handleCancel,
    handleDelete,
    handleEdit,
    handleSave,
    getFaviconUrl,
    toggleExpand,
    expandedIndex,
    handleCopyQr,
    copiedQrIndex,
  };
}
