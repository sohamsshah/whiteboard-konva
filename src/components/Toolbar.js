import React from "react";
import { useShapes } from "../context/shapes-context";
import { useTools } from "../context/tools-context";
import { generateCircle } from "../utils/generateCircle";
import { generateRectangle } from "../utils/generateRectangle";

export const Toolbar = () => {
  const { shapes, setShapes } = useShapes();
  const { tools, setTools } = useTools();

  const handleDragToolToggle = () => {
    const updatedTools = {
      ...tools,
      dragToolEnabled: !tools.dragToolEnabled,
    };
    setTools(updatedTools);
  };

  const handleAddRectangle = () => {
    const newRectangle = generateRectangle();
    const updatedShapes = {
      ...shapes,
      rectangles: [...shapes.rectangles, newRectangle],
      history: [...shapes.history, { id: newRectangle.id, type: "rectangle" }],
    };
    setShapes(updatedShapes);
  };

  const handleAddCircle = () => {
    const newCircle = generateCircle();
    const updatedShapes = {
      ...shapes,
      circles: [...shapes.circles, newCircle],
      history: [...shapes.history, { id: newCircle.id, type: "circle" }],
    };
    setShapes(updatedShapes);
  };

  const handleUndo = () => {
    const lastShape = shapes.history.pop();
    if (lastShape) {
      if (lastShape.type === "rectangle") {
        const updatedRectangles = shapes.rectangles.filter(
          (rectangle) => rectangle.id !== lastShape.id
        );
        setShapes((prev) => ({
          ...prev,
          rectangles: updatedRectangles,
          history: shapes.history,
        }));
      } else if (lastShape.type === "circle") {
        const updatedCircles = shapes.circles.filter(
          (circle) => circle.id !== lastShape.id
        );
        setShapes((prev) => ({
          ...prev,
          circles: updatedCircles,
          history: shapes.history,
        }));
      }
    }
  };

  const handleDeleteSelected = () => {
    const shapeToBeDeleted = shapes.selectedShape;
    if (shapeToBeDeleted.type === "rectangle") {
      const updatedRectangles = shapes.circles.filter(
        (rectangle) => rectangle.id !== shapeToBeDeleted.id
      );
      setShapes((prev) => ({
        ...prev,
        rectangles: updatedRectangles,
      }));
    }
  };

  return (
    <div className="controls">
      <button onClick={handleAddRectangle}>Add rectangle</button>
      <button onClick={handleAddCircle}>Add circle</button>
      <button onClick={handleDragToolToggle}>Toggle Drag</button>
      <button onClick={handleDeleteSelected}>Delete</button>
      <button onClick={handleUndo}>Undo</button>
    </div>
  );
};
