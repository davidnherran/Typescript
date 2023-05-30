import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Navbar } from "./";

export default {
  title: "Visor de Contenido/Navbar",
  component: Navbar,
  args: {
    content: [
      {
        NAME: "Título del contenido",
      },
    ],
  },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: "default",
};

export const Harmony = Template.bind({});
Harmony.args = {
  variant: "harmony",
};

export const NBD = Template.bind({});
NBD.args = {
  variant: "nbd",
};

