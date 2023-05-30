import React from "react";
import { ThemeProvider } from "styled-components";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { addDecorator } from "@storybook/react";

import ContentPortal from ".";
import { WisengineContent } from "../../WisengineProvider";
import { selectTheme } from "./theme";

// Apollo client setup
const client = new ApolloClient({
  uri: "https://api.example.com/graphql",
  cache: new InMemoryCache(),
});

// Decorator for ThemeProvider
addDecorator((storyFn) => (
  <WisengineContent.Provider value={{ config: { theme: "nbd" } }}>
    <ThemeProvider theme={selectTheme("nbd")}>
      <ApolloProvider client={client}>{storyFn()}</ApolloProvider>
    </ThemeProvider>
  </WisengineContent.Provider>
));

// Story
export default {
  title: "Components/ContentPortal",
  component: ContentPortal,
  argTypes: {
    theme: {
      control: { type: "select", options: ["nbd", "harmony"] },
    },
  },
};

const Template = (args) => <ContentPortal {...args} />;

export const Default = Template.bind({});

export const WithCustomTheme = Template.bind({});
WithCustomTheme.args = {
  theme: "harmony",
};
