import { createContext, useContext, useState } from "react";
import { NEW_NOTES } from "../utils/constants";
import { generateNotes } from "../utils/generateNotes";

const ShapesContext = createContext();

const initialState = {
  circles: [],
  rectangles: [],
  notes: [],
  history: [],
  selectedShape: null,
};

export const ShapesProvider = ({ children }) => {
  const [shapes, setShapes] = useState(initialState);
  return (
    <ShapesContext.Provider value={{ shapes, setShapes }}>
      {children}
    </ShapesContext.Provider>
  );
};

export const useShapes = () => {
  return useContext(ShapesContext);
};
