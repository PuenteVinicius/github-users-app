import React from "react";
import { GitHubUser } from "../../types/github";

interface UserCardProps {
  user: GitHubUser;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const onUserClick = () => {
    window.open(user.html_url, "_blank");
  };

  return (
    <div
      onClick={() => onUserClick()}
      className="flex items-center justify-center flex-col w-34 h-34 border border-neutral-600 rounded-lg p-1 shadow-sm transition duration-150 ease-in-out hover:shadow-md m-2 cursor-pointer"
    >
      <div className="flex flex-col items-center justify-center">
        <img
          className="size-14 rounded-full"
          src={user.avatar_url}
          alt={user.login}
        />
        <p className="text-neutral-50 text-sm mt-2">{user.login}</p>
        <p className="text-neutral-500 text-xs mt-.5">@{user.login}</p>
      </div>
    </div>
  );
};
