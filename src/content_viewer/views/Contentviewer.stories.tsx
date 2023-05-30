import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ContentViewer from ".";
import { content } from "../mocks/content.mock";

export default {
  title: "Visor de Contenido/ContentViewer",
  component: ContentViewer,
} as ComponentMeta<typeof ContentViewer>;

const Template: ComponentStory<typeof ContentViewer> = (args) => (
  <ContentViewer {...args} />
);

export const Default = Template.bind({});

Default.args = {
  content
};