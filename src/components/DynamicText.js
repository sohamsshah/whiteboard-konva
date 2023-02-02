import React from "react";
import { Text } from "react-konva";

export const DynamicText = ({ x, y, text, charPerLine, ...restProps }) => {
  if (text.length < charPerLine) {
    return <Text x={x} y={y} text={text} {...restProps} />;
  } else {
    return (
      <>
        <Text x={x} y={y} text={text.slice(0, charPerLine)} {...restProps} />
        <DynamicText
          text={text.slice(charPerLine, text.length)}
          x={x}
          y={y + 12}
          charPerLine={charPerLine}
          {...restProps}
        />
      </>
    );
  }
};
