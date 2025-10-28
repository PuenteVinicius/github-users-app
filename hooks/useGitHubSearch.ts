import { useState } from 'react'
import { GitHubSearchResponse, GitHubUser } from '../types/github'
import { GitHubApiService } from '../services/githubApi'

interface UseGitHubSearchReturn {
  users: GitHubUser[]
  loading: boolean
  error: string | null
  totalCount: number
  searchUsers: (query: string, page?: number) => Promise<void>
  cleanUsers: () => void;
}

export const useGitHubSearch = (): UseGitHubSearchReturn => {
  const [users, setUsers] = useState<GitHubUser[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  const searchUsers = async (query: string, page: number = 1) => {
    if (!query.trim()) {
      setUsers([])
      setTotalCount(0)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    setTimeout(async () => {
      try {
        const data: GitHubSearchResponse = await GitHubApiService.searchUsers(
          query,
          page
        )
        setUsers(data.items)
        setTotalCount(data.total_count)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setUsers([])
        setTotalCount(0)
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  const cleanUsers = () => {
    setUsers([]);
  }

  return {
    users,
    loading,
    error,
    totalCount,
    searchUsers,
    cleanUsers,
  }
}