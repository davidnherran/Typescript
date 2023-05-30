import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Controls } from "./";
import { content } from "../../mocks/content.mock";

export default {
  title: "Visor de Contenido/Controls",
  component: Controls,
  args: {
    content,
    segmentPosition: 0,
    videoTrack: 0,
    isFullscreen: false,
    handleClick: () => {},
    handleOver: () => {},
  },
} as ComponentMeta<typeof Controls>;

const Template: ComponentStory<typeof Controls> = (args) => (
  <Controls {...args} />
);

export const Default = Template.bind({});
Default.args = {
  /* the args you need here will depend on your component */
};