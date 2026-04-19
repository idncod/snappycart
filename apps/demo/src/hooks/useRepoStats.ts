import { useEffect, useState } from 'react';

type RepoStats = {
  stars: number;
  forks: number;
};

type RepoStatsState = {
  stats: RepoStats | null;
  isLoading: boolean;
  error: boolean;
};

const CACHE_KEY = 'snappycart-repo-stats';
const CACHE_TTL_MS = 1000 * 60 * 30;

type CachedRepoStats = {
  stats: RepoStats;
  fetchedAt: number;
};

function readCache(): RepoStats | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CachedRepoStats;
    if (!parsed?.stats || !parsed?.fetchedAt) return null;

    const isFresh = Date.now() - parsed.fetchedAt < CACHE_TTL_MS;
    return isFresh ? parsed.stats : null;
  } catch {
    return null;
  }
}

function writeCache(stats: RepoStats) {
  try {
    const payload: CachedRepoStats = {
      stats,
      fetchedAt: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    return;
  }
}

export function useRepoStats(owner: string, repo: string): RepoStatsState {
  const [state, setState] = useState<RepoStatsState>({
    stats: null,
    isLoading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const cached = readCache();

      if (cached) {
        setState({
          stats: cached,
          isLoading: false,
          error: false,
        });
        return;
      }

      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
          headers: {
            Accept: 'application/vnd.github+json',
          },
        });

        if (!response.ok) {
          throw new Error(`GitHub API failed with ${response.status}`);
        }

        const data = await response.json();

        const stats: RepoStats = {
          stars: Number(data.stargazers_count ?? 0),
          forks: Number(data.forks_count ?? 0),
        };

        writeCache(stats);

        if (!cancelled) {
          setState({
            stats,
            isLoading: false,
            error: false,
          });
        }
      } catch {
        if (!cancelled) {
          setState({
            stats: null,
            isLoading: false,
            error: true,
          });
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [owner, repo]);

  return state;
}
