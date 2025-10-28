// hooks/useGitHubSearch.test.ts
import { renderHook, act, waitFor } from '@testing-library/react'
import { useGitHubSearch } from './useGitHubSearch'
import { GitHubApiService } from '../services/githubApi'
import { GitHubSearchResponse, GitHubUser } from '../types/github'

// Mock do serviço
jest.mock('../services/githubApi')

// Mock do setTimeout
jest.useFakeTimers()

describe('useGitHubSearch', () => {
  const mockUsers: GitHubUser[] = [
    {
      id: 1,
      login: 'user1',
      avatar_url: 'https://avatar1.com',
      html_url: 'https://github.com/user1',
      type: 'User'
    },
    {
      id: 2,
      login: 'user2',
      avatar_url: 'https://avatar2.com',
      html_url: 'https://github.com/user2',
      type: 'User'
    }
  ]

  const mockSearchResponse: GitHubSearchResponse = {
    total_count: 2,
    incomplete_results: false,
    items: mockUsers
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  describe('Initial State', () => {
    it('should initialize with correct default values', () => {
      const { result } = renderHook(() => useGitHubSearch())

      expect(result.current.users).toEqual([])
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe(null)
      expect(result.current.totalCount).toBe(0)
    })
  })

  describe('searchUsers', () => {
    it('should set loading to true when search starts', async () => {
      (GitHubApiService.searchUsers as jest.Mock).mockResolvedValue(mockSearchResponse)

      const { result } = renderHook(() => useGitHubSearch())

      act(() => {
        result.current.searchUsers('test')
      })

      expect(result.current.loading).toBe(true)
    })

    it('should fetch users successfully', async () => {
      (GitHubApiService.searchUsers as jest.Mock).mockResolvedValue(mockSearchResponse)

      const { result } = renderHook(() => useGitHubSearch())

      await act(async () => {
        await result.current.searchUsers('test')
        jest.advanceTimersByTime(1000)
      })

      await waitFor(() => {
        expect(result.current.users).toEqual(mockUsers)
        expect(result.current.totalCount).toBe(2)
        expect(result.current.loading).toBe(false)
        expect(result.current.error).toBe(null)
      })
    })

    it('should handle empty query by clearing results', async () => {
      const { result } = renderHook(() => useGitHubSearch())

      // Primeiro seta alguns dados
      await act(async () => {
        result.current.searchUsers('test')
        jest.advanceTimersByTime(1000)
      })

      // Agora testa com query vazia
      await act(async () => {
        await result.current.searchUsers('')
      })

      expect(result.current.users).toEqual([])
      expect(result.current.totalCount).toBe(0)
      expect(result.current.error).toBe(null)
      expect(result.current.loading).toBe(false)
    })

    it('should handle query with only spaces', async () => {
      const { result } = renderHook(() => useGitHubSearch())

      await act(async () => {
        await result.current.searchUsers('   ')
      })

      expect(result.current.users).toEqual([])
      expect(result.current.totalCount).toBe(0)
      expect(GitHubApiService.searchUsers).not.toHaveBeenCalled()
    })

    it('should pass correct page parameter to API', async () => {
      (GitHubApiService.searchUsers as jest.Mock).mockResolvedValue(mockSearchResponse)

      const { result } = renderHook(() => useGitHubSearch())

      await act(async () => {
        await result.current.searchUsers('test', 2)
        jest.advanceTimersByTime(1000)
      })

      expect(GitHubApiService.searchUsers).toHaveBeenCalledWith('test', 2)
    })

    it('should use default page 1 when not provided', async () => {
      (GitHubApiService.searchUsers as jest.Mock).mockResolvedValue(mockSearchResponse)

      const { result } = renderHook(() => useGitHubSearch())

      await act(async () => {
        await result.current.searchUsers('test')
        jest.advanceTimersByTime(1000)
      })

      expect(GitHubApiService.searchUsers).toHaveBeenCalledWith('test', 1)
    })
  })

  describe('cleanUsers', () => {
    it('should clear users array', async () => {
      (GitHubApiService.searchUsers as jest.Mock).mockResolvedValue(mockSearchResponse)

      const { result } = renderHook(() => useGitHubSearch())

      // Primeiro busca alguns usuários
      await act(async () => {
        await result.current.searchUsers('test')
        jest.advanceTimersByTime(1000)
      })

      // Verifica que tem usuários
      expect(result.current.users).toHaveLength(2)

      // Limpa os usuários
      act(() => {
        result.current.cleanUsers()
      })

      // Verifica que foi limpo
      expect(result.current.users).toEqual([])
      // Nota: totalCount não é alterado pelo cleanUsers
    })

    it('should not affect other states when cleaning', async () => {
      (GitHubApiService.searchUsers as jest.Mock).mockResolvedValue(mockSearchResponse)

      const { result } = renderHook(() => useGitHubSearch())

      // Busca usuários
      await act(async () => {
        await result.current.searchUsers('test')
        jest.advanceTimersByTime(1000)
      })

      const previousTotalCount = result.current.totalCount
      const previousLoading = result.current.loading
      const previousError = result.current.error

      // Limpa usuários
      act(() => {
        result.current.cleanUsers()
      })

      // Verifica que apenas users foi alterado
      expect(result.current.users).toEqual([])
      expect(result.current.totalCount).toBe(previousTotalCount)
      expect(result.current.loading).toBe(previousLoading)
      expect(result.current.error).toBe(previousError)
    })
  })

  describe('Error Handling', () => {
    it('should handle non-Error objects in catch block', async () => {
      (GitHubApiService.searchUsers as jest.Mock).mockRejectedValue('String error')

      const { result } = renderHook(() => useGitHubSearch())

      await act(async () => {
        await result.current.searchUsers('test')
        jest.advanceTimersByTime(1000)
      })

      await waitFor(() => {
        expect(result.current.error).toBe('An error occurred')
        expect(result.current.users).toEqual([])
        expect(result.current.totalCount).toBe(0)
      })
    })
  })

  describe('Timing', () => {
    it('should respect the 1 second timeout', async () => {
      (GitHubApiService.searchUsers as jest.Mock).mockResolvedValue(mockSearchResponse)

      const { result } = renderHook(() => useGitHubSearch())

      const searchPromise = act(async () => {
        await result.current.searchUsers('test')
      })

      // Avança o timer em 1 segundo
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      await searchPromise

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
    })
  })
})