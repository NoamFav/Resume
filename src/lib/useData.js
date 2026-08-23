import { useEffect, useState } from "react";

const BASE = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : import.meta.env.BASE_URL + "/";

/**
 * Loads one or more JSON endpoints from /data and merges them into a single
 * object keyed by endpoint name (e.g. `skills.json` -> data.skills).
 */
export function useData(endpoints) {
    const key = Array.isArray(endpoints) ? endpoints.join(",") : endpoints;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let alive = true;
        const list = Array.isArray(endpoints) ? endpoints : [endpoints];

        Promise.all(
            list.map((endpoint) =>
                fetch(`${BASE}data/${endpoint}.json`).then((res) => {
                    if (!res.ok) throw new Error(`Failed to load ${endpoint}`);
                    return res.json();
                }),
            ),
        )
            .then((responses) => {
                if (!alive) return;
                setData(
                    list.reduce((acc, endpoint, index) => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    return { data, isLoading: !data && !error, error };
}
