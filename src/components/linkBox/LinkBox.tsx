"use client";
import React from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import {
  MdContentCopy,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { IMAGES } from "@/constant/images";
import { GrEdit } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import useLinkBox from "@/hooks/useLinkBox";
import { TiArrowUnsorted } from "react-icons/ti";
import Loader from "../loader/Loader";

export default function LinkBox() {
  const {
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
  } = useLinkBox();

  return (
    <div className=" text-white rounded-lg overflow-hidden ">
      {loading && <Loader />}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full ">
          <thead>
            <tr className="border-b border-gray-800 bg-[#0D1117] text-[#C9CED6] text-xs sm:text-sm md:text-[15] font-[700px]">
              <th className="py-4 px-4 text-left">Short Link</th>
              <th className="py-4 px-4 text-left ">Original Link</th>
              <th className="py-4 px-4 text-center">QR Code</th>
              <th className="py-4 px-4 text-center">Clicks</th>
              <th className="py-4 px-4 text-left">Status</th>
              <th className="py-6 px-10 text-left flex justify-end items-center gap-3">
                Date{" "}
                <span>
                  <TiArrowUnsorted />
                </span>
              </th>
              {isLoggedIn && <th className="py-4 px-4 text-center">Action</th>}
            </tr>
          </thead>
          <tbody className=" text-xs sm:text-sm md:text-[14px] font-[300px]">
            {links.length === 0 && !loading && !error ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-4 px-4 text-center text-[#C9CED6]"
                >
                  No URLs shortened yet
                </td>
              </tr>
            ) : (
              links.map((link, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 bg-[#181E2938]"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#C9CED6] mr-2 truncate max-w-[120px] md:max-w-xs">
                        {link.shortLink}
                      </span>
                      <button
                        onClick={() => handleCopy(link.shortLink, index)}
                        className="text-[#C9CED6] bg-[#181E29]  p-2 rounded-full hover:text-white relative"
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
                  <td className="py-4 ">
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
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={editedUrl}
                          onChange={(e) => setEditedUrl(e.target.value)}
                          className="ml-2 bg-gray-800 text-[#C9CED6] border border-gray-700 rounded px-2 py-1 w-full max-w-[270px]"
                        />
                      ) : (
                        <span className="ml-2 truncate max-w-[280px] text-[#C9CED6]">
                          {link.originalLink}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center cursor-pointer">
                      {link.qrCode ? (
                        <>
                          <Image
                            src={link.qrCode}
                            alt="QR Code"
                            width={50}
                            height={50}
                            onClick={() => handleCopyQr(link.qrCode, index)}
                          />
                          {copiedQrIndex === index && (
                            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded px-2 py-1">
                              Copied!
                            </span>
                          )}
                        </>
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
                      {editIndex === index ? (
                        <select
                          value={editedStatus}
                          onChange={(e) =>
                            setEditedStatus(
                              e.target.value as "Active" | "Inactive"
                            )
                          }
                          className="bg-gray-800 text-[#C9CED6] border border-gray-700 rounded px-2 py-1"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      ) : (
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
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-[#C9CED6]">
                    {link.date}
                  </td>
                  {isLoggedIn && (
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        {editIndex === index ? (
                          <>
                            <button
                              onClick={() => handleSave(link.shortLink)}
                              className="bg-[#181E29] py-2 px-4 text-[#C9CED6] hover:text-white hover:bg-[#353C4A] transition"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="bg-[#181E29] p-2 rounded-full text-[#C9CED6] hover:text-white hover:bg-[#353C4A] transition"
                            >
                              <FaTimes size={16} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                handleEdit(
                                  index,
                                  link.originalLink,
                                  link.status
                                )
                              }
                              className="bg-[#181E29] p-2 rounded-full text-[#C9CED6] hover:text-white hover:bg-[#353C4A] transition"
                            >
                              <GrEdit size={20} />
                            </button>
                            <button
                              onClick={() => handleDelete(link.shortLink)}
                              className="bg-[#181E29] p-2 rounded-full text-[#C9CED6] hover:text-white hover:bg-[#353C4A] transition"
                            >
                              <AiOutlineDelete size={20} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="block sm:hidden p-4">
        <div
          className="bg-[#0D1117] p-6 mb-1 "
          style={{ borderRadius: "0.5rem 0.5rem 0 0" }}
        >
          Shorten Url
        </div>
        {links.length === 0 && !loading && !error ? (
          <p className="text-center text-[#C9CED6]">No URLs shortened yet</p>
        ) : (
          links.map((link, index) => (
            <div key={index} className="bg-[#181E2938]  p-4 mb-1 ">
              <div className="flex items-center justify-between ">
                <div className="flex items-center">
                  <span className="text-[#C9CED6] truncate max-w-[180px]">
                    {link.shortLink}
                  </span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleCopy(link.shortLink, index)}
                    className="text-[#C9CED6] hover:text-white relative mr-5 rounded-full p-3 bg-[#1C283FB0]"
                  >
                    <MdContentCopy size={18} />
                    {copiedIndex === index && (
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded px-2 py-1">
                        Copied!
                      </span>
                    )}
                  </button>
                  {expandedIndex === index ? (
                    <span
                      className="p-1 bg-[#1C283FB0] rounded-full"
                      onClick={() => toggleExpand(index)}
                    >
                      <MdKeyboardArrowUp size={30} color="white" />
                    </span>
                  ) : (
                    <span
                      className="p-1 bg-[#1C283FB0] rounded-full"
                      onClick={() => toggleExpand(index)}
                    >
                      {" "}
                      <MdKeyboardArrowDown size={30} color="white" />
                    </span>
                  )}
                </div>
              </div>

              {expandedIndex === index && (
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <span className="text-[#C9CED6] font-semibold mr-2">
                      Original Link:
                    </span>
                    <div className="flex items-center flex-1 overflow-hidden">
                      <Image
                        src={getFaviconUrl(link.originalLink)}
                        alt={`${link.originalLink} favicon`}
                        width={20}
                        height={20}
                        unoptimized
                        className="mr-2"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/default-favicon.png";
                        }}
                      />
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={editedUrl}
                          onChange={(e) => setEditedUrl(e.target.value)}
                          className="bg-gray-800 text-[#C9CED6] border border-gray-700 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        <span className="text-[#C9CED6] truncate">
                          {link.originalLink}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center mb-2">
                    <span className="text-[#C9CED6] font-semibold mr-2">
                      QR Code:
                    </span>
                    {link.qrCode ? (
                      <>
                        <Image
                          src={link.qrCode}
                          alt="QR Code"
                          width={40}
                          height={40}
                          onClick={() => handleCopyQr(link.qrCode, index)}
                        />
                        {copiedQrIndex === index && (
                          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded px-2 py-1">
                            Copied!
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-[#C9CED6]">Generating...</span>
                    )}
                  </div>

                  <div className="flex items-center mb-2">
                    <span className="text-[#C9CED6] font-semibold mr-2">
                      Clicks:
                    </span>
                    <span className="text-[#C9CED6]">{link.clicks}</span>
                  </div>

                  <div className="flex items-center mb-2">
                    <span className="text-[#C9CED6] font-semibold mr-2">
                      Status:
                    </span>
                    {editIndex === index ? (
                      <select
                        value={editedStatus}
                        onChange={(e) =>
                          setEditedStatus(
                            e.target.value as "Active" | "Inactive"
                          )
                        }
                        className="bg-gray-800 text-[#C9CED6] border border-gray-700 rounded px-2 py-1"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    ) : (
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
                            width={25}
                            height={25}
                          />
                        ) : (
                          <Image
                            src={IMAGES.INACTIVE}
                            alt="inactive link"
                            width={25}
                            height={25}
                          />
                        )}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center mb-2">
                    <span className="text-[#C9CED6] font-semibold mr-2">
                      Date:
                    </span>
                    <span className="text-[#C9CED6]">{link.date}</span>
                  </div>

                  {isLoggedIn && (
                    <div className="flex justify-end gap-2 mt-2">
                      {editIndex === index ? (
                        <>
                          <button
                            onClick={() => handleSave(link.shortLink)}
                            className="bg-[#181E29] py-2 px-4 text-[#C9CED6] hover:text-white hover:bg-[#353C4A] transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="bg-[#181E29] p-2 rounded-full text-[#C9CED6] hover:text-white hover:bg-[#353C4A] transition"
                          >
                            <FaTimes size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              handleEdit(index, link.originalLink, link.status)
                            }
                            className="bg-[#222529] p-2 rounded-full text-[#C9CED6] hover:text-white hover:bg-[#353C4A] transition"
                          >
                            <GrEdit size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(link.shortLink)}
                            className="bg-[#181E29] p-2 rounded-full text-[#C9CED6] hover:text-white hover:bg-[#353C4A] transition"
                          >
                            <AiOutlineDelete size={20} />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
