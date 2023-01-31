import { Circle } from "react-konva";
import { useShapes } from "../context/shapes-context";

export const Circles = () => {
  const {
    shapes: { circles },
    setShapes,
  } = useShapes();

  const handleDragStart = (e) => {
    const id = e.target.id();
    const updatedCircles = circles.map((circle) => {
      if (circle.id === id) {
        return { ...circle, isDragging: true };
      }
      return circle;
    });
    setShapes((prev) => ({ ...prev, circles: updatedCircles }));
  };

  const handleDragEnd = (e) => {
    const id = e.target.id();
    const updatedCircles = circles.map((circle) => {
      if (circle.id === id) {
        return { ...circle, isDragging: false };
      }
      return circle;
    });
    setShapes((prev) => ({ ...prev, circles: updatedCircles }));
  };

  return circles.map((circle) => (
    <Circle
      key={circle.id}
      id={circle.id}
      x={circle.x}
      y={circle.y}
      width={circle.width}
      height={circle.height}
      fill={circle.fill}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  ));
};
