import React, { useState } from "react";
import { useShapes } from "../context/shapes-context";
import { useTools } from "../context/tools-context";
import { generateCircle } from "../utils/generateCircle";
import { generateNotes } from "../utils/generateNotes";
import { generateRectangle } from "../utils/generateRectangle";

export const Toolbar = () => {
  const [input, setInput] = useState("");
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

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleImportNotes = async () => {
    try {
      // nextBtn.disabled = true;
      // nextBtn.classList.add("activeLoading");
      const url = input;
      const response = await fetch(url);
      // const result = manageErrors(response);
      const reader = response.body.getReader();
      let line = "";
      const allNotes = [];
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const data = new TextDecoder().decode(value);

        const splits = data.split("\n");

        if (splits.length > 1) {
          line += splits[0];
          if (line !== "") {
            allNotes.push(...JSON.parse(line));
          }
          line = "";
          let i = 1;
          while (i < splits.length) {
            if (line !== "") {
              allNotes.push(...JSON.parse(line));
              line = "";
            }

            if (splits[i] !== "") {
              line += splits[i];
            }
            i += 1;
          }
        } else {
          line += data;
        }
      }
      console.log(allNotes);
      setShapes((prev) => ({ ...prev, notes: generateNotes(allNotes) }));
      // parent.postMessage(
      //   { pluginMessage: { type: "create-notes", notes: allNotes } },
      //   "*"
      // );
      // nextBtn.disabled = false;
      // nextBtn.classList.remove("activeLoading");
    } catch (error) {
      if (error === "Error: Link has expired!") {
        // showError.innerText = `${error}`;
      } else {
        // showError.innerText =
        //   "Can’t recognize this URL. Go to Analyze project on Marvin. Select the notes you want to export. Click on Export to Figma to copy the export link.";
      }
    } finally {
      // nextBtn.disabled = false;
      // nextBtn.classList.remove("activeLoading");
    }
  };

  return (
    <div className="controls">
      <button onClick={handleAddRectangle}>Add rectangle</button>
      <button onClick={handleAddCircle}>Add circle</button>
      <button onClick={handleDragToolToggle}>Toggle Drag</button>
      <button onClick={handleDeleteSelected}>Delete</button>
      <button onClick={handleUndo}>Undo</button>
      <div>
        <input onChange={handleInputChange} />
        <button onClick={handleImportNotes}>Import notes</button>
      </div>
    </div>
  );
};
