// src/hooks/useBlog.ts
import { API_BASE } from "../lib/api";
import { getJSON } from "../lib/fetcher";
import type { BlogPost, Comment } from "../lib/types";
import { useEffect, useState } from "react";

export function useBlogPosts() {
    const [data, setData] = useState<BlogPost[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setErr] = useState<Error | null>(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const posts = await getJSON<BlogPost[]>(
                    `${API_BASE}/api/blog`,
                    {
                        // Let browser cache with ETag; revalidate when you refresh
                        headers: { Accept: "application/json" },
                    },
                );
                if (alive) setData(posts);
            } catch (e: any) {
                if (alive) setErr(e);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, []);

    return { data, loading, error };
}

export function useBlogPost(id: number | string) {
    const [data, setData] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setErr] = useState<Error | null>(null);

    useEffect(() => {
        if (!id) return;
        let alive = true;
        (async () => {
            try {
                const post = await getJSON<BlogPost>(
                    `${API_BASE}/api/blog/${id}`,
                );
                if (alive) setData(post);
            } catch (e: any) {
                if (alive) setErr(e);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, [id]);

    return { data, loading, error };
}

export function useComments(postId: number | string, enabled = true) {
    const [data, setData] = useState<Comment[] | null>(null);
    const [loading, setLoading] = useState(!!enabled);
    const [error, setErr] = useState<Error | null>(null);

    useEffect(() => {
        if (!enabled || !postId) return;
        let alive = true;
        (async () => {
            try {
                const comments = await getJSON<Comment[]>(
                    `${API_BASE}/api/comments/${postId}`,
                );
                if (alive) setData(comments);
            } catch (e: any) {
                if (alive) setErr(e);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, [postId, enabled]);

    return { data, loading, error };
}
