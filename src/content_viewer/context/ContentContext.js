import React, { createContext, useContext, useState } from "react";

const context = createContext();

export const useContent = () => {
  const ContentContext = useContext(context);
  if (!context) throw new Error("Context API requires a provider");
  return ContentContext;
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState();
  const [userContext, setUserContext] = useState();
  const [levelContent, setLevelContent] = useState("");

  return (
    <context.Provider
      value={{ content, setContent, userContext, setUserContext, levelContent, setLevelContent }}
    >
      {children}
    </context.Provider>
  );
};
