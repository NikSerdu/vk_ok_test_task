import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    data_testid_content: "button-content",
  },
  parameters: {
    controls: {
      exclude: ["data_testid_content"],
    },
  },

  render: (args) => {
    return (
      <Button {...args} data-testid="button">
        <Button.Text text={"Что сделать"} />
        <Button.Counter quantity={10} data-testid={"counter-in-button"} />
      </Button>
    );
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const content = canvas.getByTestId("button-content");
    const { state } = args;
    if (state && state === "loading") {
      await expect(content).toHaveStyle({ opacity: 0 });
    }
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    state: "enabled",
    focused: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    focused: false,
    state: "enabled",
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
      ],
    },
  },
};
