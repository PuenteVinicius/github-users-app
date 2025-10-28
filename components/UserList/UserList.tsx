import React from "react";

import { UserCard } from "../UserCard/UserCard";
import { GitHubUser } from "../../types/github";

interface UserListProps {
  users: GitHubUser[];
  loading: boolean;
  error: string | null;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  loading,
  error,
}) => {
  if (loading) {
    return <div className="text-neutral-50">Searching GitHub users...</div>;
  }

  if (error) {
    return <div className="text-neutral-50">Error: {error}</div>;
  }

  if (users.length === 0) {
    return (
      <div className="text-neutral-50">
        No users found. Try searching for GitHub users.
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-wrap mt-8 justify-center">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
