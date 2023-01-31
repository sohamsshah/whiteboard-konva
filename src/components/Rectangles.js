import React from "react";
import { useShapes } from "../context/shapes-context";
import { Rectangle } from "./Rectangle";

export const Rectangles = () => {
  const {
    shapes: { rectangles, selectedShapeId },
    setShapes,
  } = useShapes();

  const handleSelect = (e) => {
    setShapes((prev) => ({ ...prev, selectedShapeId: e.target.id() }));
  };

  const handleShapeTransform = (updatedRectangle) => {
    const updatedRectangles = rectangles.map((rectangle) => {
      if (rectangle.id === updatedRectangle.id) {
        return updatedRectangle;
      }
      return rectangle;
    });

    setShapes((prev) => ({ ...prev, rectangles: updatedRectangles }));
  };

  console.log(rectangles);

  return rectangles.map((rectangle) => (
    <Rectangle
      key={rectangle.id}
      id={rectangle.id}
      x={rectangle.x}
      y={rectangle.y}
      width={rectangle.width}
      height={rectangle.height}
      fill={rectangle.fill}
      draggable
      isSelected={selectedShapeId === rectangle.id}
      onSelect={handleSelect}
      onChange={handleShapeTransform}
    />
  ));
};
