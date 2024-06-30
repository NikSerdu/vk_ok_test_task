import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import Counter from "./Counter";

const meta: Meta<typeof Counter> = {
  title: "Components/Counter",
  component: Counter,

  tags: ["autodocs"],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const element = await canvas.getByTestId("counter");
    const { size, quantity } = args;
    if (size && size <= 12) {
      await expect(element).toHaveTextContent("");
    } else {
      if (typeof quantity === "number") {
        if (quantity >= 100) {
          await expect(element).toHaveTextContent(`99+`);
        } else {
          await expect(element).toHaveTextContent(`${quantity}`);
        }
      }
      if (typeof quantity === "string") {
        if (quantity.length > 3) {
        } else {
          await expect(element).toHaveTextContent(`${quantity}`);
        }
      }
    }
  },
  render: (args) => <Counter data-testid="counter" {...args} />,
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
};

export default meta;

type Story = StoryObj<typeof Counter>;

export const Primary: Story = {
  args: {
    variant: "primary",
    quantity: 10,
    pulse: false,
    stroke: false,
    stroke_color: "#76f41c",
    size: 24,
  },
};

export const Secondary: Story = {
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
  args: {
    variant: "secondary",
    quantity: 100,
    pulse: false,
    stroke: false,
    stroke_color: "#737373",
    size: 24,
  },
};
