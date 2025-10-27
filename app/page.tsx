"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGitHubSearch } from "../hooks/useGitHubSearch";
import { Input } from "../components/ui/Input/Input";
import { Button } from "../components/ui/Button/Button";
import { UserList } from "../components/UserList/UserList";
import { Pagination } from "../components/ui/Pagination/Pagination";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 2rem;
  display: flex;
  gap: 1rem;
`;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { users, loading, error, totalCount, searchUsers } = useGitHubSearch();

  const totalPages = Math.ceil(totalCount / 20);

  const handleSearch = async (page: number = 1) => {
    await searchUsers(searchQuery, page);
    setCurrentPage(page);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(1);
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearch(1);
    }
  }, [searchQuery]);

  return (
    <Container>
      <Header>
        <Title>GitHub Users Search</Title>
        <Subtitle>Find developers and contributors on GitHub</Subtitle>
      </Header>

      <form onSubmit={handleSubmit}>
        <SearchContainer>
          <Input
            type="text"
            placeholder="Search GitHub users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            Search
          </Button>
        </SearchContainer>
      </form>

      <UserList
        users={users}
        loading={loading}
        error={error}
        totalCount={totalCount}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handleSearch}
        />
      )}
    </Container>
  );
}
