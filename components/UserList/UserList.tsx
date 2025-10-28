import React from "react";

import { UserCard } from "../UserCard/UserCard";
import { GitHubUser } from "../../types/github";

interface UserListProps {
  users: GitHubUser[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  loading,
  error,
  totalCount,
}) => {
  if (loading) {
    return <div>Searching GitHub users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (users.length === 0) {
    return <div>No users found. Try searching for GitHub users.</div>;
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
