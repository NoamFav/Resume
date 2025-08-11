import React, { useState, useEffect } from "react";
import {
    FaHeart,
    FaRegHeart,
    FaComment,
    FaShare,
    FaBookmark,
    FaRegBookmark,
    FaEllipsisH,
    FaCalendarAlt,
    FaClock,
    FaEye,
    FaTag,
    FaSearch,
    FaMusic,
    FaCode,
    FaGamepad,
    FaCoffee,
    FaFire,
    FaUser,
    FaChevronDown,
    FaImage,
    FaLink,
    FaPaperPlane,
    FaSmile,
} from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

import { API_BASE } from "../lib/api";
import { getJSON } from "../lib/fetcher";

// Sidebar component with practical blog features
const BlogSidebar = ({ onCategoryFilter, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const categories = [
        { name: "All Posts", count: 24, color: "blue" },
        { name: "Coding", count: 12, color: "green" },
        { name: "Lifestyle", count: 8, color: "purple" },
        { name: "Tutorials", count: 6, color: "orange" },
        { name: "Reviews", count: 4, color: "pink" },
    ];

    const recentActivity = [
        {
            type: "music",
            text: "Listening to Lo-fi Hip Hop",
            icon: FaMusic,
            color: "pink",
        },
        {
            type: "code",
            text: "Working on React project",
            icon: FaCode,
            color: "blue",
        },
        {
            type: "gaming",
            text: "Playing Cyberpunk 2077",
            icon: FaGamepad,
            color: "cyan",
        },
        {
            type: "coffee",
            text: "4th coffee of the day",
            icon: FaCoffee,
            color: "yellow",
        },
    ];

    const trendingTags = [
        { name: "react", count: 45 },
        { name: "javascript", count: 38 },
        { name: "portfolio", count: 29 },
        { name: "coding", count: 52 },
        { name: "webdev", count: 41 },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <div className="space-y-6">
            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-xl border-2 border-pink-500/20 p-6 sticky top-6"
            >
                <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/20 relative">
                        <span className="text-white text-2xl font-bold">
                            NF
                        </span>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <h3 className="text-white font-bold text-lg">
                        Noam's DevBlog
                    </h3>
                    <p className="text-pink-300 text-sm">
                        Coding my way through life! ✨
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div>
                        <div className="text-white font-bold text-lg">24</div>
                        <div className="text-white/60 text-xs">Posts</div>
                    </div>
                    <div>
                        <div className="text-white font-bold text-lg">1.2k</div>
                        <div className="text-white/60 text-xs">Followers</div>
                    </div>
                    <div>
                        <div className="text-white font-bold text-lg">856</div>
                        <div className="text-white/60 text-xs">Likes</div>
                    </div>
                </div>

                {/* Current Activity */}
                <div className="border-t border-white/10 pt-4">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <FaFire className="text-orange-400" />
                        Current Vibe
                    </h4>
                    <div className="space-y-2 text-sm">
                        {recentActivity.map((activity, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                            >
                                <activity.icon
                                    className={`text-${activity.color}-400`}
                                />
                                <span>{activity.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Search */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4"
            >
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-10 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300"
                    >
                        <FaPaperPlane />
                    </button>
                </form>
            </motion.div>

            {/* Categories */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4"
            >
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <FaTag className="text-blue-400" />
                    Categories
                </h4>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => onCategoryFilter(category.name)}
                            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors text-left group"
                        >
                            <span className="text-white/70 group-hover:text-white">
                                {category.name}
                            </span>
                            <span
                                className={`text-${category.color}-400 text-sm font-medium`}
                            >
                                {category.count}
                            </span>
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Trending Tags */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4"
            >
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <FaArrowTrendUp className="text-green-400" />
                    Trending Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                    {trendingTags.map((tag) => (
                        <button
                            key={tag.name}
                            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white/70 hover:text-white transition-colors border border-white/10"
                        >
                            #{tag.name} ({tag.count})
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

// Comment component
const Comment = ({ comment, onLike }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
        >
            <div className="relative flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                        {comment.user.avatar}
                    </span>
                </div>
                {comment.user.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium text-sm">
                        {comment.user.name}
                    </span>
                    <span className="text-white/50 text-xs">
                        {comment.timestamp}
                    </span>
                </div>
                <p className="text-white/80 text-sm mb-2">{comment.content}</p>
                <div className="flex items-center gap-4 text-xs">
                    <button
                        onClick={() => onLike(comment.id)}
                        className={`flex items-center gap-1 transition-colors ${
                            comment.isLiked
                                ? "text-red-400"
                                : "text-white/50 hover:text-red-400"
                        }`}
                    >
                        {comment.isLiked ? <FaHeart /> : <FaRegHeart />}
                        {comment.likes}
                    </button>
                    <button className="text-white/50 hover:text-blue-400 transition-colors">
                        Reply
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// Blog post component
const BlogPost = ({
    post,
    comments,
    onLike,
    onBookmark,
    onComment,
    onToggleComments,
}) => {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");

    const toggle = async () => {
        const next = !showComments;
        setShowComments(next);
        if (next && onToggleComments) await onToggleComments();
    };

    const renderContent = (content) => {
        // Simple markdown-like rendering
        return content.split("\n").map((line, index) => {
            // Image rendering
            if (line.match(/!\[.*\]\(.*\)/)) {
                const match = line.match(/!\[(.*?)\]\((.*?)\)/);
                return (
                    <div key={index} className="my-4">
                        <img
                            src={match[2]}
                            alt={match[1]}
                            className="rounded-lg w-full max-w-lg mx-auto shadow-lg"
                        />
                    </div>
                );
            }

            // Link rendering
            if (line.match(/\[.*\]\(.*\)/)) {
                const parts = line.split(/(\[.*?\]\(.*?\))/);
                return (
                    <p key={index} className="mb-2 text-white/80">
                        {parts.map((part, partIndex) => {
                            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                            if (linkMatch) {
                                return (
                                    <a
                                        key={partIndex}
                                        href={linkMatch[2]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 underline"
                                    >
                                        {linkMatch[1]}
                                    </a>
                                );
                            }
                            return part;
                        })}
                    </p>
                );
            }

            // Regular text
            if (line.trim()) {
                return (
                    <p key={index} className="mb-2 text-white/80">
                        {line}
                    </p>
                );
            }
            return <br key={index} />;
        });
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            onComment(post.id, newComment);
            setNewComment("");
        }
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all"
        >
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                                {post.author.avatar}
                            </span>
                        </div>
                        {post.author.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                        )}
                    </div>
                    <div>
                        <h3 className="text-white font-medium">
                            {post.author.name}
                        </h3>
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                            <FaClock className="w-3 h-3" />
                            {post.timestamp}
                        </div>
                    </div>
                </div>
                <button className="text-white/50 hover:text-white p-2">
                    <FaEllipsisH />
                </button>
            </div>

            {/* Post Title */}
            <h2 className="text-xl font-bold text-white mb-4">{post.title}</h2>

            {/* Post Content */}
            <div className="mb-6">{renderContent(post.content)}</div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm hover:bg-blue-500/30 transition-colors cursor-pointer"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Post Stats */}
            <div className="flex items-center gap-6 text-white/60 text-sm mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-1">
                    <FaEye />
                    {post.views} views
                </div>
                <div className="flex items-center gap-1">
                    <FaHeart className="text-red-400" />
                    {post.likes} likes
                </div>
                <div className="flex items-center gap-1">
                    <FaComment className="text-blue-400" />
                    {post.comments} comments
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onLike(post.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                            post.isLiked
                                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-red-400"
                        }`}
                    >
                        {post.isLiked ? <FaHeart /> : <FaRegHeart />}
                        Like
                    </button>
                    <button
                        onClick={toggle}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-blue-400 transition-all"
                    >
                        <FaComment />
                        Comment
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-green-400 transition-all">
                        <FaShare />
                        Share
                    </button>
                </div>
                <button
                    onClick={() => onBookmark(post.id)}
                    className={`p-2 rounded-lg transition-all ${
                        post.isBookmarked
                            ? "text-yellow-400 hover:text-yellow-300"
                            : "text-white/50 hover:text-yellow-400"
                    }`}
                >
                    {post.isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                </button>
            </div>

            {/* Comments Section */}
            <AnimatePresence>
                {showComments && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-white/10 pt-4"
                    >
                        {/* Comment Form */}
                        <form onSubmit={handleCommentSubmit} className="mb-4">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xs font-bold">
                                        YU
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Write a comment..."
                                        value={newComment}
                                        onChange={(e) =>
                                            setNewComment(e.target.value)
                                        }
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors mb-2"
                                    />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                className="text-white/50 hover:text-yellow-400 transition-colors"
                                            >
                                                <FaSmile />
                                            </button>
                                            <button
                                                type="button"
                                                className="text-white/50 hover:text-blue-400 transition-colors"
                                            >
                                                <FaImage />
                                            </button>
                                            <button
                                                type="button"
                                                className="text-white/50 hover:text-green-400 transition-colors"
                                            >
                                                <FaLink />
                                            </button>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={!newComment.trim()}
                                            className="px-4 py-1 bg-blue-600 hover:bg-blue-500 disabled:bg-white/10 disabled:text-white/30 text-white rounded-lg text-sm transition-colors"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {comments?.map((comment) => (
                                <Comment
                                    key={comment.id}
                                    comment={comment}
                                    onLike={() => {}}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    );
};

// Main Blog component
export default function Blog() {
    const [posts, setPosts] = useState([]); // from API
    const [comments, setComments] = useState({}); // { [postId]: Comment[] }
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All Posts");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const data = await getJSON(`${API_BASE}/api/blog`);
                if (!alive) return;
                setPosts(data);
            } catch (e) {
                if (!alive) return;
                setError("Failed to load posts");
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, []);

    // On-demand comments loader
    const loadComments = async (postId) => {
        // don’t refetch if we already have them
        if (comments[postId]) return;
        try {
            const data = await getJSON(`${API_BASE}/api/comments/${postId}`);
            setComments((prev) => ({ ...prev, [postId]: data }));
        } catch {
            setComments((prev) => ({ ...prev, [postId]: [] }));
        }
    };

    const handleLike = (postId) => {
        setPosts((ps) =>
            ps.map((p) =>
                p.id === postId
                    ? {
                          ...p,
                          isLiked: !p.isLiked,
                          likes: p.isLiked ? p.likes - 1 : p.likes + 1,
                      }
                    : p,
            ),
        );
    };

    const handleBookmark = (postId) => {
        setPosts((ps) =>
            ps.map((p) =>
                p.id === postId ? { ...p, isBookmarked: !p.isBookmarked } : p,
            ),
        );
    };

    const handleComment = (postId, content) => {
        const newC = {
            id: Date.now(),
            user: { name: "You", avatar: "YU", isOnline: true },
            content,
            timestamp: "Just now",
            likes: 0,
            isLiked: false,
        };
        setComments((prev) => ({
            ...prev,
            [postId]: [...(prev[postId] || []), newC],
        }));
        setPosts((ps) =>
            ps.map((p) =>
                p.id === postId ? { ...p, comments: p.comments + 1 } : p,
            ),
        );
    };

    const filteredPosts = posts.filter((p) => {
        const catsOk =
            selectedCategory === "All Posts" ||
            p.tags?.includes(selectedCategory.toLowerCase());
        const searchOk =
            !searchTerm ||
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.content.toLowerCase().includes(searchTerm.toLowerCase());
        return catsOk && searchOk;
    });

    if (loading) return <div className="p-6">Loading…</div>;
    if (error) return <div className="p-6 text-red-400">{error}</div>;

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        // In a real app, this would filter posts
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        // In a real app, this would filter posts by search term
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600 opacity-10 blur-3xl rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600 opacity-10 blur-3xl rounded-full" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600 opacity-5 blur-3xl rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        DevBlog Chronicles
                    </h1>
                    <p className="text-xl text-white/70 mb-6">
                        Sharing my coding journey, one post at a time ✨
                    </p>
                    <div className="flex items-center justify-center gap-2 text-white/50">
                        <FaCalendarAlt />
                        <span>Updated daily</span>
                        <span>•</span>
                        <FaUser />
                        <span>1.2k followers</span>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Blog Posts */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="lg:col-span-3 space-y-8">
                            {filteredPosts.map((post) => (
                                <div key={post.id}>
                                    <BlogPost
                                        post={post}
                                        comments={comments[post.id]}
                                        onLike={handleLike}
                                        onBookmark={handleBookmark}
                                        onComment={handleComment}
                                        onToggleComments={async () =>
                                            loadComments(post.id)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Load More Button */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-center"
                        >
                            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-blue-500/30 hover:scale-105">
                                Load More Posts
                            </button>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <BlogSidebar
                            onCategoryFilter={handleCategoryFilter}
                            onSearch={handleSearch}
                        />
                    </div>
                </div>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 pt-8 border-t border-white/10 text-center"
                >
                    <div className="flex items-center justify-center gap-6 mb-6">
                        <button className="text-white/50 hover:text-blue-400 transition-colors">
                            <FaMusic className="w-5 h-5" />
                        </button>
                        <button className="text-white/50 hover:text-green-400 transition-colors">
                            <FaCode className="w-5 h-5" />
                        </button>
                        <button className="text-white/50 hover:text-purple-400 transition-colors">
                            <FaGamepad className="w-5 h-5" />
                        </button>
                        <button className="text-white/50 hover:text-yellow-400 transition-colors">
                            <FaCoffee className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-white/50 text-sm">
                        Made with ❤️ and lots of coffee • © 2025 Alex's DevBlog
                    </p>
                    <p className="text-white/30 text-xs mt-2">
                        "Code is poetry written in logic" - Anonymous Developer
                    </p>
                </motion.footer>
            </div>

            {/* Floating Action Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white rounded-full shadow-lg hover:shadow-pink-500/30 flex items-center justify-center transition-all z-50"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                <FaChevronDown className="rotate-180" />
            </motion.button>

            {/* Mobile Menu Overlay (for responsive design) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/10 p-4">
                <div className="flex items-center justify-around">
                    <button className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                        <FaHeart className="w-5 h-5" />
                        <span className="text-xs">Liked</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                        <FaBookmark className="w-5 h-5" />
                        <span className="text-xs">Saved</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                        <FaSearch className="w-5 h-5" />
                        <span className="text-xs">Search</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                        <FaUser className="w-5 h-5" />
                        <span className="text-xs">Profile</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
