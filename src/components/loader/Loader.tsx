import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent border-[#144EE3] border-l-[#EB568E] animate-spin"></div>
        <div className="absolute inset-2 rounded-full bg-gradient-to-r from-[#144EE3] to-[#EB568E] opacity-50 animate-pulse"></div>
        <div className="absolute inset-0 animate-spin-slow">
          <div className="w-3 h-3 rounded-full bg-[#144EE3] absolute top-0 left-1/2 -translate-x-1/2"></div>
          <div className="w-3 h-3 rounded-full bg-[#EB568E] absolute bottom-0 left-1/2 -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
}
