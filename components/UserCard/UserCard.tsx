import React from "react";
import styled from "styled-components";

import { Button } from "../ui/Button/Button";
import { GitHubUser } from "../../types/github";

interface UserCardProps {
  user: GitHubUser;
}

const Card = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const UserLogin = styled.p`
  color: #6b7280;
  margin: 0.25rem 0 0 0;
`;

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card>
      <UserInfo>
        <Avatar src={user.avatar_url} alt={user.login} />
        <UserDetails>
          <UserName>{user.login}</UserName>
          <UserLogin>@{user.login}</UserLogin>
        </UserDetails>
      </UserInfo>
      <Button rel="noopener noreferrer" className="w-full">
        View Profile
      </Button>
    </Card>
  );
};
