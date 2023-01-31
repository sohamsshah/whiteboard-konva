import { createContext, useContext, useState } from "react";

const ToolsContext = createContext();

const initialState = {
  dragToolDisabled: false,
};

export const ToolsProvider = ({ children }) => {
  const [tools, setTools] = useState(initialState);
  return (
    <ToolsContext.Provider value={{ tools, setTools }}>
      {children}
    </ToolsContext.Provider>
  );
};

export const useTools = () => {
  return useContext(ToolsContext);
};
