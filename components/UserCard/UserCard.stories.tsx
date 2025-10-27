import type { Meta, StoryObj } from "@storybook/react";
import { UserCard } from "./UserCard";

const meta: Meta<typeof UserCard> = {
  title: "Components/UserCard",
  component: UserCard,
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    user: {
      id: 1,
      login: "octocat",
      avatar_url: "https://github.com/octocat.png",
      html_url: "https://github.com/octocat",
      type: "User",
    },
  },
};
