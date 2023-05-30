import { ApolloClient, InMemoryCache } from "@apollo/client";

const PORT = 8010;
const URI = 'https://devs.wisengine.co';
const API = '/api/cmgt';
const HOST = `${URI}:${PORT}${API}`;

export const GraphQLClient = new ApolloClient({
  uri: HOST,
  cache: new InMemoryCache(),
  headers: {
    "Authorization": `Api-Key ${localStorage.getItem("CMGT_TOKEN")}`,
  }
});

export const setConfig = (routes: { [key: string]: string; }) => {
  localStorage.setItem("routes", JSON.stringify(routes));
};
