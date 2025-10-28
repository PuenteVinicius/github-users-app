// services/githubApi.test.ts
import { GitHubApiService } from './githubApi'
import { GitHubSearchResponse } from '../types/github'

// Mock global do fetch
global.fetch = jest.fn()

describe('GitHubApiService', () => {
  const mockUsersResponse: GitHubSearchResponse = {
    total_count: 2,
    incomplete_results: false,
    items: [
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
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockClear()
  })

  describe('searchUsers', () => {
    it('should return empty results for empty query', async () => {
      const result = await GitHubApiService.searchUsers('')

      expect(result).toEqual({
        total_count: 0,
        incomplete_results: false,
        items: []
      })
      expect(fetch).not.toHaveBeenCalled()
    })

    it('should return empty results for query with only spaces', async () => {
      const result = await GitHubApiService.searchUsers('   ')

      expect(result).toEqual({
        total_count: 0,
        incomplete_results: false,
        items: []
      })
      expect(fetch).not.toHaveBeenCalled()
    })

    it('should make API call with correct URL for valid query', async () => {
      // Mock da resposta bem-sucedida
      const mockFetchResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockUsersResponse)
      }
      ;(fetch as jest.Mock).mockResolvedValue(mockFetchResponse)

      const result = await GitHubApiService.searchUsers('john')

      // Verifica se o fetch foi chamado com a URL correta
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/search/users?q=john&page=1&per_page=20'
      )

      // Verifica se o resultado é o esperado
      expect(result).toEqual(mockUsersResponse)
    })

    it('should encode special characters in query', async () => {
      const mockFetchResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockUsersResponse)
      }
      ;(fetch as jest.Mock).mockResolvedValue(mockFetchResponse)

      await GitHubApiService.searchUsers('user name with spaces')

      expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/search/users?q=user%20name%20with%20spaces&page=1&per_page=20'
      )
    })

    it('should use custom page and perPage parameters', async () => {
      const mockFetchResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockUsersResponse)
      }
      ;(fetch as jest.Mock).mockResolvedValue(mockFetchResponse)

      await GitHubApiService.searchUsers('test', 3, 50)

      expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/search/users?q=test&page=3&per_page=50'
      )
    })

    it('should use default page and perPage when not provided', async () => {
      const mockFetchResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockUsersResponse)
      }
      ;(fetch as jest.Mock).mockResolvedValue(mockFetchResponse)

      await GitHubApiService.searchUsers('test')

      expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/search/users?q=test&page=1&per_page=20'
      )
    })

    it('should throw error when API response is not ok', async () => {
      // Mock de resposta com erro
      const mockFetchResponse = {
        ok: false,
        status: 403,
        statusText: 'Forbidden'
      }
      ;(fetch as jest.Mock).mockResolvedValue(mockFetchResponse)

      // Verifica se a função lança o erro esperado
      await expect(GitHubApiService.searchUsers('test')).rejects.toThrow(
        'GitHub API error: 403'
      )
    })

    it('should throw error for network failures', async () => {
      // Mock de falha de rede
      ;(fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

      await expect(GitHubApiService.searchUsers('test')).rejects.toThrow(
        'Network error'
      )
    })

    it('should handle API rate limit error', async () => {
      const mockFetchResponse = {
        ok: false,
        status: 429,
        statusText: 'Too Many Requests'
      }
      ;(fetch as jest.Mock).mockResolvedValue(mockFetchResponse)

      await expect(GitHubApiService.searchUsers('test')).rejects.toThrow(
        'GitHub API error: 429'
      )
    })

    it('should handle API not found error', async () => {
      const mockFetchResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found'
      }
      ;(fetch as jest.Mock).mockResolvedValue(mockFetchResponse)

      await expect(GitHubApiService.searchUsers('test')).rejects.toThrow(
        'GitHub API error: 404'
      )
    })

    it('should handle successful response with empty items', async () => {
      const emptyResponse: GitHubSearchResponse = {
        total_count: 0,
        incomplete_results: false,
        items: []
      }

      const mockFetchResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(emptyResponse)
      }
      ;(fetch as jest.Mock).mockResolvedValue(mockFetchResponse)

      const result = await GitHubApiService.searchUsers('nonexistentuser')

      expect(result).toEqual(emptyResponse)
      expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('should handle query with special characters that need encoding', async () => {
      const mockFetchResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockUsersResponse)
      }
      ;(fetch as jest.Mock).mockResolvedValue(mockFetchResponse)

      await GitHubApiService.searchUsers('user@domain.com')

      expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/search/users?q=user%40domain.com&page=1&per_page=20'
      )
    })

    it('should handle query with plus signs', async () => {
      const mockFetchResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockUsersResponse)
      }
      ;(fetch as jest.Mock).mockResolvedValue(mockFetchResponse)

      await GitHubApiService.searchUsers('c++ developer')

      expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/search/users?q=c%2B%2B%20developer&page=1&per_page=20'
      )
    })
  })
})