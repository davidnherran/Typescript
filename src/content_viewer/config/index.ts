import { ApolloClient, InMemoryCache } from "@apollo/client";

//ok
import { THOST } from "./config.types";

export const API_URL: THOST = "https://devs.wisengine.co:8010/api/cmgt";

export const getParamId = (): number => {
  const url: string = window.location.href;
  const params: string[] = url.split("/");
  let id: string = params[params.length - 1];

  if (!id) {
    id = "101";
  }

  return Number(id);
}

export const paramId = getParamId();

// ok


const HOST = "https://devs.wisengine.co:8010/api/cmgt";

export const GraphQLClient = new ApolloClient({
  uri: HOST,
  cache: new InMemoryCache(),
});

