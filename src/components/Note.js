import React, { useState } from "react";
import { Rect, Text } from "react-konva";
import { DynamicText } from "./DynamicText";
import { NoteWrapper } from "./NoteWrapper";

export const Note = ({ id, x, y, width, height, onSelect, ...restProps }) => {
  const [xCoordinate, setXCoordinate] = useState(x);
  const [yCoordinate, setYCoordinate] = useState(y);

  const handleDragMove = (e) => {
    const updatedX = e.target.x();
    const updatedY = e.target.y();
    setXCoordinate(updatedX);
    setYCoordinate(updatedY);
  };

  return (
    <>
      <NoteWrapper
        x={xCoordinate}
        y={yCoordinate}
        id={id}
        key={id}
        height={height}
        width={width}
        onClick={onSelect}
        onDragMove={handleDragMove}
      >
        <Rect
          x={xCoordinate}
          y={yCoordinate}
          id={id}
          key={id}
          height={height}
          width={width}
          onClick={onSelect}
          onDragMove={handleDragMove}
          {...restProps}
        />
        <DynamicText
          x={xCoordinate + 20}
          y={yCoordinate + 20}
          fontSize="14"
          fontStyle="bold"
          charPerLine={40}
          text="Nemo enim ipsam voluptatem Nemo enim ipsam voluptatemNemo enim ipsam voluptatem"
        />
        <DynamicText
          x={xCoordinate + 20}
          y={yCoordinate + 60}
          charPerLine={50}
          text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem "
        />
      </NoteWrapper>
    </>
  );
};
