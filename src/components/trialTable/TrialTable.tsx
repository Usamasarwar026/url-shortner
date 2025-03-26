"use client";
import React from "react";
import Image from "next/image";
import { MdContentCopy } from "react-icons/md";
import { IMAGES } from "@/constant/images";
import useTrialTable from "@/hooks/useTrialTable";
import { TiArrowUnsorted } from "react-icons/ti";

export default function TrialTable() {
  const {
    loading,
    error,
    links,
    handleCopy,
    copiedIndex,
    getFaviconUrl,
  } = useTrialTable();
  return (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
      {loading && <p className="p-4 ">Loading...</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="border-b border-gray-800 bg-[#181E29] text-[#C9CED6]">
              <th className="py-4 px-4 text-left">Short Link</th>
              <th className="py-4 px-4 text-left">Original Link</th>
              <th className="py-4 px-4 text-center">QR Code</th>
              <th className="py-4 px-4 text-center">Clicks</th>
              <th className="py-4 px-4 text-left">Status</th>
              <th className="py-4 px-10 text-left flex justify-end items-center gap-3">
                Date{" "}
                <span>
                  <TiArrowUnsorted />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {links.length === 0 && !loading && !error ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-4 px-4 text-center text-[#C9CED6]"
                >
                  No URLs shortened yet
                </td>
              </tr>
            ) : (
              links?.map((link, index) => (
                <tr key={index} className="border-b border-gray-800 ">
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-between">
                      <span className="mr-2  text-[#C9CED6]">
                        {link.shortLink}
                      </span>
                      <button
                        onClick={() => handleCopy(link.shortLink, index)}
                        className="text-[#C9CED6] hover:text-white relative"
                      >
                        <MdContentCopy size={18} />
                        {copiedIndex === index && (
                          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded px-2 py-1">
                            Copied!
                          </span>
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <Image
                        src={getFaviconUrl(link.originalLink)}
                        alt={`${link.originalLink} favicon`}
                        width={25}
                        height={25}
                        unoptimized
                        className="mr-2"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/default-favicon.png";
                        }}
                      />
                      <span className="ml-2 truncate max-w-xs text-[#C9CED6]">
                        {link.originalLink}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      {link.qrCode ? (
                        <Image
                          src={link.qrCode}
                          alt="QR Code"
                          width={50}
                          height={50}
                        />
                      ) : (
                        <span className="text-[#C9CED6]">Generating...</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center text-[#C9CED6]">
                    {link.clicks}
                  </td>

                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <span
                        className={`flex items-center gap-2 ${
                          link.status === "Active"
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {link.status}
                        {link.status === "Active" ? (
                          <Image
                            src={IMAGES.ACTIVE}
                            alt="active link"
                            width={35}
                            height={35}
                          />
                        ) : (
                          <Image
                            src={IMAGES.INACTIVE}
                            alt="inactive link"
                            width={35}
                            height={35}
                          />
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-[#C9CED6]">
                    {link.date}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
