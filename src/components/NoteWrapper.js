import React from "react";
import { Rect } from "react-konva";

export const NoteWrapper = ({ children, ...restProps }) => {
  return (
    <>
      {children}
      <Rect draggable fill="transparent" {...restProps} />
    </>
  );
};
