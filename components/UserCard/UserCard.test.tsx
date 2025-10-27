import React from "react";
import { render, screen } from "@testing-library/react";
import { UserCard } from "./UserCard";

const mockUser = {
  id: 1,
  login: "testuser",
  avatar_url: "https://example.com/avatar.jpg",
  html_url: "https://github.com/testuser",
  type: "User",
};

describe("UserCard", () => {
  it("renders user information correctly", () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("@testuser")).toBeInTheDocument();
    expect(screen.getByAltText("testuser")).toHaveAttribute(
      "src",
      mockUser.avatar_url
    );
    expect(screen.getByText("View Profile")).toHaveAttribute(
      "href",
      mockUser.html_url
    );
  });
});
