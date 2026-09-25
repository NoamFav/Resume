import { useEffect, useState } from "react";

const BASE = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : import.meta.env.BASE_URL + "/";

// One request per file for the life of the page: the shell, the command line
// and the page all ask for the same JSON.
const cache = new Map();
const load = (endpoint) => {
    if (!cache.has(endpoint)) {
        cache.set(
            endpoint,
            fetch(`${BASE}data/${endpoint}.json`).then((res) => {
                if (!res.ok) throw new Error(`Failed to load ${endpoint}`);
                return res.json();
            }),
        );
    }
    return cache.get(endpoint);
};

export const ALL = [
    "config",
    "contact",
    "skills",
    "programming_languages",
    "tools",
    "frameworks",
    "projects",
    "experience",
    "education",
];

/**
 * Loads one or more JSON endpoints from /data and merges them into a single
 * object keyed by endpoint name (e.g. `skills.json` -> data.skills).
 */
export function useData(endpoints) {
    const list = Array.isArray(endpoints) ? endpoints : [endpoints];
    const key = list.join(",");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let alive = true;
        const names = key.split(",");
        Promise.all(names.map(load))
            .then((responses) => {
                if (!alive) return;
                setData(
                    names.reduce((acc, endpoint, index) => {
                        acc[endpoint] = responses[index];
                        return acc;
                    }, {}),
                );
            })
            .catch((err) => {
                if (alive) setError(err);
            });
        return () => {
            alive = false;
        };
    }, [key]);

    return { data, isLoading: !data && !error, error };
}
