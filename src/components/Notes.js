import React from "react";
import { useShapes } from "../context/shapes-context";
import { Note } from "./Note";

export const Notes = () => {
  const {
    shapes: { notes, selectedShape },
    setShapes,
  } = useShapes();

  const handleSelect = (e) => {
    setShapes((prev) => ({
      ...prev,
      selectedShape: { id: e.target.id(), type: "note" },
    }));
  };

  const handleDragEnd = (e) => {
    const noteId = e.target.id();
    const updatedX = e.target.x();
    const updatedY = e.target.y();
    const updatedNotes = notes.map((note) => {
      if (note.id === noteId) {
        return { ...note, x: updatedX, y: updatedY };
      }
      return note;
    });

    setShapes((prev) => ({ ...prev, notes: updatedNotes }));
  };

  return notes.map((note) => (
    <Note
      key={note.id}
      id={note.id}
      x={note.x}
      y={note.y}
      width={note.width}
      height={note.height}
      fill={note.fill}
      draggable
      cornerRadius={8}
      strokeWidth={1} // border width
      stroke="#EDEFF2" // border color
      shadowColor="rgba(111, 120, 139, 0.1)"
      shadowBlur={0}
      shadowOffset={{ x: 1, y: 1 }}
      onDragEnd={handleDragEnd}
      isSelected={selectedShape?.id === note.id}
      onSelect={handleSelect}
    />
  ));
};
