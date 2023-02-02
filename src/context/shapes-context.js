import { createContext, useContext, useState } from "react";
import { DEFAULT_NOTES } from "../utils/constants";

const ShapesContext = createContext();

const initialState = {
  circles: [],
  rectangles: [],
  notes: DEFAULT_NOTES,
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
