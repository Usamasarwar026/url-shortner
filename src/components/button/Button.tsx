import { ButtonProps } from "@/types/types";
import React from "react";

export default function Button({ className, onClick, title }: ButtonProps) {
  return (
    <button className={`${className}`} onClick={onClick}>
      {title}
    </button>
  );
}
