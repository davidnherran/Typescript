import React, { createContext, useContext } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { getContentById, getAllContents, getAllSegments } from "./services";
//import { useContent } from "../content_viewer/context/ContentContext";

interface IContext {
  getContentById: typeof getContentById;
  getAllContents: typeof getAllContents;
  getAllSegments: typeof getAllSegments;
  config: {
    theme: "harmony" | "nbd";
    customColor: string;
    routes?: {
      [key in "createContent" | "manager" | "portal" | "viewer"]: string;
    };
    token: "fb9b299097da54ee1f3e13d28af0990e" | "fa1f81db751038013828cb4e37979ae32133862ceb8c0e050320e2744f02c594" | "",
    graphQl?: {
      uri: string
    }
  };
}

const context = createContext<IContext>({
  getContentById,
  getAllContents,
  getAllSegments,
  config: {
    theme: "nbd",
    customColor: "#4c4c4c",
    token: ""
  },
});

export const WisengineContent = () => {
  const WisengineContext = useContext(context);
  if (!context) throw new Error("Context API requires a provider");
  return WisengineContext;
};

export const WisengineProvider = ({ children, config }: TWisengineProvider) => {
  const [contentId, setContentId] = React.useState<number>(0);

  function guardarTokenEnLocalStorage() {
    const tokenActual = localStorage.getItem("CMGT_TOKEN");

    if (tokenActual === null) {
      localStorage.setItem("CMGT_TOKEN", config.token);
    }
  }

  guardarTokenEnLocalStorage();

  const updateContentId = (id: string) => {
    setContentId(Number(id));
  };

  const graphQl = new ApolloClient({
    uri: config['graphQl'].uri,
    cache: new InMemoryCache(),
    headers: {
      "Authorization": `Api-Key ${config['token']}`,
    }
  });

  return (
    <ApolloProvider client={graphQl}>
      <context.Provider
        value={{
          getContentById,
          getAllContents,
          getAllSegments,
          updateContentId,
          contentId,
          config,
        }}
      >
        {children}
      </context.Provider>
    </ApolloProvider>
  );
};
