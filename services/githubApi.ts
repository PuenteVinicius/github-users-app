import { GitHubSearchResponse } from "../types/github"


const GITHUB_API_BASE = 'https://api.github.com'

export class GitHubApiService {
  static async searchUsers(
    query: string,
    page: number = 1,
    perPage: number = 20
  ): Promise<GitHubSearchResponse> {
    if (!query.trim()) {
      return { total_count: 0, incomplete_results: false, items: [] }
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    return response.json()
  }
}