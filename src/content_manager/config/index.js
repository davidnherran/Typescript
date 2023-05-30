import { ApolloClient, InMemoryCache } from "@apollo/client";

//const HOST = "http://localhost:8010/api/cmgt";
const HOST = "https://devs.wisengine.co:8010/api/cmgt";

export const GraphQLClient = new ApolloClient({
  uri: HOST,
  cache: new InMemoryCache(),
  headers: {
    "Authorization": `Api-Key ${localStorage.getItem("CMGT_TOKEN")}`,
  },
});

//! Refactorizar
export const getParamId = () => {
  const url = window.location.href;
  const params = url.split("/");
  const id = params.at(-1);
  return id;
}
