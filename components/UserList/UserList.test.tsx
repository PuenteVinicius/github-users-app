// components/UserList/UserList.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { UserList } from "./UserList";
import { GitHubUser } from "../../types/github";
import "@testing-library/jest-dom";

// Mock dos componentes filhos
jest.mock("../UserCard/UserCard", () => ({
  UserCard: ({ user }: { user: GitHubUser }) => (
    <div data-testid="user-card" data-user-id={user.id}>
      {user.login}
    </div>
  ),
}));

jest.mock("../ui/Loading/Loading", () => ({
  Loading: ({
    message,
    className,
  }: {
    message: string;
    className?: string;
  }) => (
    <div data-testid="loading" className={className}>
      {message}
    </div>
  ),
}));

describe("UserList", () => {
  const mockUsers: GitHubUser[] = [
    {
      id: 1,
      login: "user1",
      avatar_url: "https://avatar1.com",
      html_url: "https://github.com/user1",
      type: "User",
    },
    {
      id: 2,
      login: "user2",
      avatar_url: "https://avatar2.com",
      html_url: "https://github.com/user2",
      type: "User",
    },
    {
      id: 3,
      login: "user3",
      avatar_url: "https://avatar3.com",
      html_url: "https://github.com/user3",
      type: "User",
    },
  ];

  describe("Loading State", () => {
    it("should render loading component when loading is true", () => {
      render(<UserList users={[]} loading={true} error={null} />);

      const loadingElement = screen.getByTestId("loading");
      expect(loadingElement).toBeInTheDocument();
      expect(loadingElement).toHaveTextContent("Searching GitHub users...");
      expect(loadingElement).toHaveClass("flex", "mt-8", "justify-center");
    });

    it("should not render user cards when loading", () => {
      render(<UserList users={mockUsers} loading={true} error={null} />);

      expect(screen.queryByTestId("user-card")).not.toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("should render error message when error is provided", () => {
      const errorMessage = "API rate limit exceeded";

      render(<UserList users={[]} loading={false} error={errorMessage} />);

      const errorElement = screen.getByText(`Error: ${errorMessage}`);
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveClass("mt-8", "text-neutral-50");
    });

    it("should not render loading or user cards when error is present", () => {
      render(<UserList users={mockUsers} loading={false} error="Some error" />);

      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
      expect(screen.queryByTestId("user-card")).not.toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("should render empty state message when no users are provided", () => {
      render(<UserList users={[]} loading={false} error={null} />);

      const emptyStateElement = screen.getByText(
        "No users found. Try searching for GitHub users."
      );
      expect(emptyStateElement).toBeInTheDocument();
      expect(emptyStateElement).toHaveClass("mt-8", "text-red-500");
    });

    it("should not render loading or error when empty", () => {
      render(<UserList users={[]} loading={false} error={null} />);

      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
      expect(screen.queryByText(/Error:/)).not.toBeInTheDocument();
    });
  });

  describe("Success State", () => {
    it("should render user cards when users are provided", () => {
      render(<UserList users={mockUsers} loading={false} error={null} />);

      const userCards = screen.getAllByTestId("user-card");
      expect(userCards).toHaveLength(mockUsers.length);
    });

    it("should apply correct container classes", () => {
      const { container } = render(
        <UserList users={mockUsers} loading={false} error={null} />
      );

      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass("flex", "w-full", "justify-center");

      const innerContainer = mainContainer.firstChild as HTMLElement;
      expect(innerContainer).toHaveClass(
        "flex",
        "flex-wrap",
        "my-4",
        "justify-center"
      );
    });

    it("should not render loading or error when users are present", () => {
      render(<UserList users={mockUsers} loading={false} error={null} />);

      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
      expect(screen.queryByText(/Error:/)).not.toBeInTheDocument();
      expect(screen.queryByText("No users found")).not.toBeInTheDocument();
    });
  });

  describe("State Priority", () => {
    it("should prioritize loading state over error state", () => {
      render(<UserList users={mockUsers} loading={true} error="Some error" />);

      expect(screen.getByTestId("loading")).toBeInTheDocument();
      expect(screen.queryByText(/Error:/)).not.toBeInTheDocument();
      expect(screen.queryByTestId("user-card")).not.toBeInTheDocument();
    });

    it("should prioritize loading state over success state", () => {
      render(<UserList users={mockUsers} loading={true} error={null} />);

      expect(screen.getByTestId("loading")).toBeInTheDocument();
      expect(screen.queryByTestId("user-card")).not.toBeInTheDocument();
    });

    it("should prioritize error state over empty state", () => {
      render(<UserList users={[]} loading={false} error="API Error" />);

      expect(screen.getByText(/Error:/)).toBeInTheDocument();
      expect(screen.queryByText("No users found")).not.toBeInTheDocument();
    });

    it("should prioritize error state over success state", () => {
      render(<UserList users={mockUsers} loading={false} error="API Error" />);

      expect(screen.getByText(/Error:/)).toBeInTheDocument();
      expect(screen.queryByTestId("user-card")).not.toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle single user", () => {
      const singleUser = [mockUsers[0]];

      render(<UserList users={singleUser} loading={false} error={null} />);

      const userCards = screen.getAllByTestId("user-card");
      expect(userCards).toHaveLength(1);
    });

    it("should handle large number of users", () => {
      const manyUsers = Array.from({ length: 10 }, (_, i) => ({
        ...mockUsers[0],
        id: i + 1,
        login: `user${i + 1}`,
      }));

      render(<UserList users={manyUsers} loading={false} error={null} />);

      const userCards = screen.getAllByTestId("user-card");
      expect(userCards).toHaveLength(10);
    });

    it("should render with null error", () => {
      render(<UserList users={mockUsers} loading={false} error={null} />);

      expect(screen.getAllByTestId("user-card")).toHaveLength(mockUsers.length);
    });
  });

  describe("Accessibility", () => {
    it("should have proper structure in loading state", () => {
      render(<UserList users={[]} loading={true} error={null} />);

      const loadingElement = screen.getByTestId("loading");
      expect(loadingElement).toBeInTheDocument();
      expect(loadingElement).toHaveTextContent("Searching GitHub users...");
    });

    it("should have proper structure in error state", () => {
      render(<UserList users={[]} loading={false} error="Access denied" />);

      const errorElement = screen.getByText("Error: Access denied");
      expect(errorElement).toBeInTheDocument();
    });

    it("should have proper structure in success state", () => {
      render(<UserList users={mockUsers} loading={false} error={null} />);

      const userCards = screen.getAllByTestId("user-card");
      expect(userCards).toHaveLength(mockUsers.length);

      mockUsers.forEach((user, index) => {
        expect(userCards[index]).toHaveAttribute(
          "data-user-id",
          user.id.toString()
        );
      });
    });
  });
});
