import React from "react";
import { Stage, Layer, Rect } from "react-konva";
import "./App.css";
import { Circles } from "./components/Circles";
import { Notes } from "./components/Notes";
import { Rectangles } from "./components/Rectangles";
import { Toolbar } from "./components/Toolbar";
import { useShapes } from "./context/shapes-context";

import { useTools } from "./context/tools-context";

export const App = () => {
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

  return (
    <div>
      <Toolbar />
      <Stage
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
