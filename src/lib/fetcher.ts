// src/lib/f etcher.ts
export async function getJSON<T>(
    url: string,
    init: RequestInit = {},
): Promise<T> {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), 10000); // 10s timeout
    try {
        const res = await fetch(url, { signal: ctrl.signal, ...init });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return (await res.json()) as T;
    } finally {
        clearTimeout(id);
    }
}
