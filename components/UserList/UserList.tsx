import React from "react";

import { UserCard } from "../UserCard/UserCard";
import { GitHubUser } from "../../types/github";
import { Loading } from "../ui/Loading/Loading";

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
    return (
      <Loading
        className="flex mt-8 justify-center"
        show
        message="Searching GitHub users..."
      />
    );
  }

  if (error) {
    return <span className="mt-8 text-neutral-50">Error: {error}</span>;
  }

  if (users.length === 0) {
    return (
      <span className="mt-8 text-red-500">
        No users found. Try searching for GitHub users.
      </span>
    );
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-wrap my-4 justify-center">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
