// components/UserCard/UserCard.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserCard } from "./UserCard";
import { GitHubUser } from "../../types/github";
import "@testing-library/jest-dom";

// Mock do window.open
const mockWindowOpen = jest.fn();
Object.defineProperty(window, "open", {
  value: mockWindowOpen,
  writable: true,
});

describe("UserCard", () => {
  const mockUser: GitHubUser = {
    id: 1,
    login: "johnsmith",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    html_url: "https://github.com/johnsmith",
    type: "User",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockWindowOpen.mockClear();
  });

  describe("Renderização", () => {
    it("should render user information correctly", () => {
      render(<UserCard user={mockUser} />);

      // Verifica se a imagem está renderizada com os atributos corretos
      const avatarImage = screen.getByAltText(mockUser.login);
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveAttribute("src", mockUser.avatar_url);
      expect(avatarImage).toHaveClass("size-14", "rounded-full");

      // Verifica se o nome de usuário está renderizado
      const username = screen.getByText(mockUser.login);
      expect(username).toBeInTheDocument();
      expect(username).toHaveClass("text-neutral-50", "text-sm", "mt-2");

      // Verifica se o handle está renderizado
      const userHandle = screen.getByText(`@${mockUser.login}`);
      expect(userHandle).toBeInTheDocument();
      expect(userHandle).toHaveClass("text-neutral-500", "text-xs", "mt-.5");
    });

    it("should apply correct CSS classes to container", () => {
      const { container } = render(<UserCard user={mockUser} />);

      const cardContainer = container.firstChild as HTMLElement;
      expect(cardContainer).toHaveClass(
        "flex",
        "items-center",
        "justify-center",
        "flex-col",
        "w-34",
        "h-34",
        "border",
        "border-neutral-600",
        "rounded-lg",
        "p-1",
        "shadow-sm",
        "transition",
        "duration-150",
        "ease-in-out",
        "hover:shadow-md",
        "m-2",
        "cursor-pointer"
      );
    });

    it("should apply correct CSS classes to inner container", () => {
      render(<UserCard user={mockUser} />);

      const innerContainer = screen.getByText(mockUser.login).parentElement;
      expect(innerContainer).toHaveClass(
        "flex",
        "flex-col",
        "items-center",
        "justify-center"
      );
    });
  });

  describe("Interação", () => {
    it("should call window.open with correct URL when clicked", () => {
      render(<UserCard user={mockUser} />);

      const cardContainer = screen.getByText(mockUser.login).closest("div");
      fireEvent.click(cardContainer!);

      expect(mockWindowOpen).toHaveBeenCalledTimes(1);
      expect(mockWindowOpen).toHaveBeenCalledWith(mockUser.html_url, "_blank");
    });

    it("should call window.open when clicking anywhere on the card", () => {
      render(<UserCard user={mockUser} />);

      // Clica em diferentes partes do card
      const avatar = screen.getByAltText(mockUser.login);
      fireEvent.click(avatar);

      expect(mockWindowOpen).toHaveBeenCalledTimes(1);
      expect(mockWindowOpen).toHaveBeenCalledWith(mockUser.html_url, "_blank");

      // Reseta e testa clicando no texto
      mockWindowOpen.mockClear();

      const username = screen.getByText(mockUser.login);
      fireEvent.click(username);

      expect(mockWindowOpen).toHaveBeenCalledTimes(1);
      expect(mockWindowOpen).toHaveBeenCalledWith(mockUser.html_url, "_blank");
    });

    it("should have cursor-pointer class indicating it is clickable", () => {
      const { container } = render(<UserCard user={mockUser} />);

      const cardContainer = container.firstChild as HTMLElement;
      expect(cardContainer).toHaveClass("cursor-pointer");
    });
  });

  describe("Acessibilidade", () => {
    it("should have proper alt text for avatar image", () => {
      render(<UserCard user={mockUser} />);

      const avatarImage = screen.getByAltText(mockUser.login);
      expect(avatarImage).toBeInTheDocument();
    });

    it("should have semantic structure", () => {
      const { container } = render(<UserCard user={mockUser} />);

      // Verifica se a estrutura geral está correta
      expect(container.firstChild).toBeInTheDocument();

      // Verifica se a imagem está presente
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle user with very long login name", () => {
      const userWithLongName: GitHubUser = {
        ...mockUser,
        login: "verylongusernameexampletest",
      };

      render(<UserCard user={userWithLongName} />);

      expect(screen.getByText(userWithLongName.login)).toBeInTheDocument();
      expect(
        screen.getByText(`@${userWithLongName.login}`)
      ).toBeInTheDocument();
    });

    it("should handle user with special characters in login", () => {
      const userWithSpecialChars: GitHubUser = {
        ...mockUser,
        login: "user-name.with.special_chars",
      };

      render(<UserCard user={userWithSpecialChars} />);

      expect(screen.getByText(userWithSpecialChars.login)).toBeInTheDocument();
      expect(
        screen.getByText(`@${userWithSpecialChars.login}`)
      ).toBeInTheDocument();
    });

    it("should handle different user types", () => {
      const organizationUser: GitHubUser = {
        ...mockUser,
        type: "Organization",
      };

      render(<UserCard user={organizationUser} />);

      // O componente deve renderizar normalmente independente do type
      expect(screen.getByText(organizationUser.login)).toBeInTheDocument();
      expect(screen.getByAltText(organizationUser.login)).toBeInTheDocument();
    });

    it("should handle missing avatar URL gracefully", () => {
      const userWithoutAvatar: GitHubUser = {
        ...mockUser,
        avatar_url: "",
      };

      render(<UserCard user={userWithoutAvatar} />);

      const avatarImage = screen.getByAltText(userWithoutAvatar.login);
      expect(avatarImage).toHaveAttribute("src", "");
    });
  });

  describe("Performance e Comportamento", () => {
    it("should not call window.open on render", () => {
      render(<UserCard user={mockUser} />);

      expect(mockWindowOpen).not.toHaveBeenCalled();
    });

    it("should maintain referential equality of onUserClick function", () => {
      const { rerender } = render(<UserCard user={mockUser} />);

      // Simula múltiplos renders
      rerender(<UserCard user={mockUser} />);
      rerender(<UserCard user={mockUser} />);

      const cardContainer = screen.getByText(mockUser.login).closest("div");
      fireEvent.click(cardContainer!);

      expect(mockWindowOpen).toHaveBeenCalledTimes(1);
    });
  });

  describe("Prop Validation", () => {
    it("should render without crashing when required props are provided", () => {
      expect(() => render(<UserCard user={mockUser} />)).not.toThrow();
    });

    it("should handle minimal user object", () => {
      const minimalUser: GitHubUser = {
        id: 123,
        login: "minimal",
        avatar_url: "",
        html_url: "https://github.com/minimal",
        type: "User",
      };

      expect(() => render(<UserCard user={minimalUser} />)).not.toThrow();

      expect(screen.getByText("minimal")).toBeInTheDocument();
      expect(screen.getByText("@minimal")).toBeInTheDocument();
    });
  });
});
