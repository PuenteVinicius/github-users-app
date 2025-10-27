import React from "react";
import styled from "styled-components";

import { UserCard } from "../UserCard/UserCard";
import { GitHubUser } from "../../types/github";

interface UserListProps {
  users: GitHubUser[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

const Container = styled.div`
  margin-top: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ef4444;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

const ResultsInfo = styled.div`
  margin-bottom: 1rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

export const UserList: React.FC<UserListProps> = ({
  users,
  loading,
  error,
  totalCount,
}) => {
  if (loading) {
    return <LoadingState>Searching GitHub users...</LoadingState>;
  }

  if (error) {
    return <ErrorState>Error: {error}</ErrorState>;
  }

  if (users.length === 0) {
    return (
      <EmptyState>No users found. Try searching for GitHub users.</EmptyState>
    );
  }

  return (
    <Container>
      <ResultsInfo>
        Found {totalCount.toLocaleString()} user{totalCount !== 1 ? "s" : ""}
      </ResultsInfo>
      <Grid>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Grid>
    </Container>
  );
};
