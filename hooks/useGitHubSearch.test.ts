import { renderHook } from '@testing-library/react'
import { useGitHubSearch } from './useGitHubSearch'

jest.mock('@/services/githubApi')

describe('useGitHubSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useGitHubSearch())
    
    expect(result.current.users).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
    expect(result.current.totalCount).toBe(0)
  })
})