import { useEffect, useState } from "react";

const USERNAME = "NoamFav";

/**
 * Pulls live public stats from the GitHub REST API (unauthenticated,
 * subject to GitHub's public rate limit). Fails silently — callers should
 * treat `data` as optional and render sensible fallbacks.
 */
export function useGithubStats() {
    const [data, setData] = useState(null);

    useEffect(() => {
        let alive = true;

        (async () => {
            try {
                const [userRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${USERNAME}`),
                    fetch(
                        `https://api.github.com/users/${USERNAME}/repos?per_page=100`,
                    ),
                ]);
                if (!userRes.ok || !reposRes.ok) return;

                const user = await userRes.json();
                const repos = await reposRes.json();
                const stars = Array.isArray(repos)
                    ? repos.reduce(
                          (sum, r) => sum + (r.stargazers_count || 0),
                          0,
                      )
                    : 0;

                if (alive) {
                    setData({
                        publicRepos: user.public_repos,
                        followers: user.followers,
                        stars,
                    });
                }
            } catch {
                // silently ignore — network/rate-limit failures just hide the section
            }
        })();

        return () => {
            alive = false;
        };
    }, []);

    return data;
}
