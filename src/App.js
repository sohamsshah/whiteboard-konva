import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import "./App.css";
import { Circles } from "./components/Circles";
import { Notes } from "./components/Notes";
import { Rectangles } from "./components/Rectangles";
import { Toolbar } from "./components/Toolbar";
import { useShapes } from "./context/shapes-context";

import { useTools } from "./context/tools-context";

export const App = () => {
  const [stage, setStage] = useState({ scale: 1, x: 0, y: 0 });
  const { setShapes } = useShapes();
  const {
    tools: { dragToolEnabled },
  } = useTools();

  const handleOnMouseDown = (e) => {
    //deselect when clicking an empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setShapes((prev) => ({ ...prev, selectedShape: null }));
    }
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setStage({
      scale: newScale,
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    });
  };

  return (
    <div>
      <Toolbar />
      <Stage
        onWheel={handleWheel}
        scaleX={stage.scale}
        scaleY={stage.scale}
        style={{
          cursor: dragToolEnabled ? "grab" : "default",
          backgroundSize: "16.8721px 16.8721px",
          backgroundImage:
            "radial-gradient(rgb(209, 204, 217) 0.843606px, transparent 0px)",
        }}
        draggable={dragToolEnabled}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleOnMouseDown}
      >
        <Layer>
          <Rectangles />
          <Circles />
          <Notes />
        </Layer>
      </Stage>
    </div>
  );
};
