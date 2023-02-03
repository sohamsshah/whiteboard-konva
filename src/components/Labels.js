import React from "react";
import { Label, Tag, Text } from "react-konva";

export const Labels = ({ labels, x, y }) => {
  let initialX = x;
  return labels.map((label, index) => {
    initialX =
      index === 0 ? x : initialX + labels[index - 1].text.length * 6 + 8;
    return (
      <Label x={initialX} y={y}>
        <Tag stroke="#EDEFF2" strokeWidth={1} fill="white" />
        <Text padding={4} fontSize={12} text={label.text} />
      </Label>
    );
  });
};
