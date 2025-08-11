// src/lib/types.ts
export type Author = { name: string; avatar: string; isOnline: boolean };

export type BlogPost = {
    id: number;
    title: string;
    content: string;
    author: Author;
    timestamp: string;
    likes: number;
    comments: number;
    views: number;
    tags: string[];
    isLiked: boolean;
    isBookmarked: boolean;
};

export type Comment = {
    id: number;
    user: Author;
    content: string;
    timestamp: string;
    likes: number;
    isLiked: boolean;
};
