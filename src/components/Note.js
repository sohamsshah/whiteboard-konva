import React, { useState } from "react";
import { Group, Image as KonvaImage, Rect, Text } from "react-konva";
import { DynamicText } from "./DynamicText";
import { Labels } from "./Labels";
import { NoteWrapper } from "./NoteWrapper";

export const Note = ({
  title,
  comment,
  name,
  id,
  x,
  y,
  labels,
  width,
  height,
  onSelect,
  onDragEnd,
  ...restProps
}) => {
  const [xCoordinate, setXCoordinate] = useState(x);
  const [yCoordinate, setYCoordinate] = useState(y);
  // console.log({ xCoordinate, yCoordinate });
  const handleDragMove = (e) => {
    const updatedX = e.target.x();
    const updatedY = e.target.y();
    setXCoordinate(updatedX);
    setYCoordinate(updatedY);
  };

  var clipSquare = function (ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  let userAvatar = new Image();
  userAvatar.src = "https://konvajs.org/assets/yoda.jpg";
  return (
    <>
      <NoteWrapper
        perfectDrawEnabled={false}
        x={xCoordinate}
        y={yCoordinate}
        id={id}
        draggable
        key={id}
        height={height}
        width={width}
        onClick={onSelect}
        onDragMove={handleDragMove}
      >
        <Rect
          perfectDrawEnabled={false}
          x={xCoordinate}
          y={yCoordinate}
          id={id}
          key={id}
          transformsEnabled={"position"}
          height={height}
          width={width}
          onClick={onSelect}
          onDragEnd={onDragEnd}
          {...restProps}
        />
        {/* <Labels x={xCoordinate + 16} y={yCoordinate + 16} labels={labels} /> */}
        {title && (
          <DynamicText
            perfectDrawEnabled={false}
            transformsEnabled={"position"}
            x={xCoordinate + 16}
            y={yCoordinate + 16 * 2 + 12}
            fontSize={14}
            fontStyle="bold"
            charPerLine={40}
            text={title}
          />
        )}
        {comment && (
          <DynamicText
            perfectDrawEnabled={false}
            transformsEnabled={"position"}
            x={xCoordinate + 20}
            y={yCoordinate + 60}
            charPerLine={50}
            text={comment}
          />
        )}
        {/* <Group
          transformsEnabled={"position"}
          perfectDrawEnabled={false}
          x={xCoordinate + 20}
          y={yCoordinate + height - 40}
          height={30}
          width={30}
          clipFunc={(ctx) => {
            // ctx.arc(20, 120, 50, 0, Math.PI * 2, false);
            clipSquare(ctx, 0, 0, 30, 30, 15);
            // ctx.arc(20, 20, 0, 0, Math.PI * 2, false);
          }}
        >
          <KonvaImage height={30} width={30} image={userAvatar} />
        </Group>
        <Text
          fontSize={12}
          fontStyle="bold"
          text={name}
          x={xCoordinate + 60}
          y={yCoordinate + height - 30}
        />
        <Text
          fontSize={12}
          text={"a few seconds ago"}
          x={xCoordinate + 150}
          y={yCoordinate + height - 30}
        /> */}
      </NoteWrapper>
    </>
  );
};
