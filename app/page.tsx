"use client";

import React, { useState, useEffect } from "react";
import { useGitHubSearch } from "../hooks/useGitHubSearch";
import { Input } from "../components/ui/Input/Input";
import { UserList } from "../components/UserList/UserList";
import { Pagination } from "../components/ui/Pagination/Pagination";
import { useDebounce } from "use-debounce";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1200);
  const { users, loading, error, totalCount, searchUsers, cleanUsers } =
    useGitHubSearch();

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
    if (searchQuery.length === 0) {
      cleanUsers();
    }
    if (searchQuery.trim()) {
      handleSearch(1);
    }
  }, [debouncedSearchQuery]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center items-center flex-col w-full mt-12 ">
        <h1 className="text-neutral-50 text-3xl px-0 mx-0 pb-1 mb-4">
          Github Users
        </h1>
        <h2 className="text-neutral-50 text-md px-0 mx-0 pb-1 mb-4">
          Find developers and contributors on GitHub
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center w-full"
        >
          <div className="flex justify-center items-center w-full">
            <Input
              className="text-neutral-50 max-w-lg mx-6"
              type="text"
              placeholder="Search GitHub users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        <UserList users={users} loading={loading} error={error} />
        {totalPages > 1 && users.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handleSearch}
          />
        )}
      </div>
    </div>
  );
}
