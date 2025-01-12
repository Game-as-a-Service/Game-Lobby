import type { Meta, StoryObj } from "@storybook/react";
import Image from ".";

const meta: Meta<typeof Image> = {
  title: "Data Display/ Image",
  component: Image,
  tags: ["autodocs"],
  args: {
    src: "https://images.unsplash.com/photo-1684006231760-3f0290bf42a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1550&q=80",
    alt: "image",
    width: 100,
    height: 130,
  },
  argTypes: {
    src: {
      type: "string",
    },
    alt: {
      type: "string",
    },
  },
};

type Story = StoryObj<typeof Image>;

export const Playground: Story = {
  render: (args) => <Image alt={args.alt} {...args} />,
};

export const DefaultErrorImage: Story = {
  render: (args) => <Image alt={args.alt} {...args} />,
};

DefaultErrorImage.args = {
  src: "error src",
};

export default meta;
