import React from "react";

export default function Button(props:any) {
  return (
    <button className={`${props.className}`}>
      {props.title}
    </button>
  );
}
