"use client";
import React from "react";
import Input from "../input/Input";
import useUpdateForm from "@/hooks/useUpdateForm";

export default function UpdateForm() {
  const {
    password,
    setPassword,
    newPassword,
    setNewPassword,
    handleUpdatePassword,
    loading,
  } = useUpdateForm();
  return (
    <>
      <div className="text-center w-full">
        <Input
          type="password"
          placeholder="Current Password"
          className="w-[85%] md:w-[50%]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="New Password"
          className="w-[85%] md:w-[50%]"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <button
        onClick={handleUpdatePassword}
        disabled={loading}
        className={`flex items-center justify-center w-[220px] h-[50px] md:w-[260px] md:h-[60px] font-semibold text-[16px] md:text-[20px] text-white bg-[#144EE3] border-[#144EE3] rounded-full hover:bg-[#273e92] transition shadow-md ${
          loading ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <svg
              className="animate-spin h-6 w-6 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Updating...
          </div>
        ) : (
          "Update Password"
        )}
      </button>
    </>
  );
}
