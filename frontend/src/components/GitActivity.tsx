import React, { useState, useEffect } from "react";

// Define TypeScript interfaces for GitHub activity data
interface GitHubRepo {
    name: string;
}

interface GitHubCommit {
    message: string;
}

interface GitHubPullRequest {
    title: string;
}

interface GitHubIssue {
    title: string;
}

interface GitHubPayload {
    commits?: GitHubCommit[];
    action?: string;
    pull_request?: GitHubPullRequest;
    issue?: GitHubIssue;
    ref_type?: string;
    ref?: string;
}

interface GitHubActivity {
    id: number;
    type: string;
    repo: GitHubRepo;
    created_at: string;
    payload: GitHubPayload;
}

const GitActivity: React.FC = () => {
    const [activities, setActivities] = useState<GitHubActivity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchGitActivity = async (): Promise<void> => {
        setLoading(true);
        try {
            // Fetch GitHub activity for NoamFav
            const response = await fetch(
                "https://api.github.com/users/NoamFav/events",
            );

            if (!response.ok) {
                throw new Error(
                    `API responded with status: ${response.status}`,
                );
            }

            const data = await response.json();
            data.length = Math.min(data.length, 5); // Limit to 5 most recent events
            setActivities(data);
            setError(null);
        } catch (err) {
            setError(
                "Failed to fetch GitHub activity. Please try again later.",
            );
            console.error("Error fetching GitHub activity:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGitActivity();
    }, []);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    const getEventIcon = (type: string): JSX.Element => {
        switch (type) {
            case "PushEvent":
                return (
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z" />
                        <path d="M6.5 7.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                    </svg>
                );
            case "PullRequestEvent":
                return (
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M7.177 3.073L9.573.677A.25.25 0 0 1 10 .854v4.792a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354zM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm8.25-6a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5z" />
                    </svg>
                );
            case "IssueCommentEvent":
                return (
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 0 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8zM5 12.25v3.25a.25.25 0 0 0 .4.2l1.45-1.087a.25.25 0 0 1 .3 0L8.6 15.7a.25.25 0 0 0 .4-.2v-3.25a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25z" />
                    </svg>
                );
            case "CreateEvent":
                return (
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                );
            default:
                return (
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z" />
                    </svg>
                );
        }
    };

    const getEventDescription = (activity: GitHubActivity): string => {
        switch (activity.type) {
            case "PushEvent":
                return activity.payload.commits &&
                    activity.payload.commits.length > 0
                    ? `Pushed: ${activity.payload.commits[0].message}`
                    : "Pushed to repository";
            case "PullRequestEvent":
                return activity.payload.pull_request
                    ? `${activity.payload.action || ""} PR: ${activity.payload.pull_request.title}`
                    : "Pull request activity";
            case "IssueCommentEvent":
                return activity.payload.issue
                    ? `Commented on: ${activity.payload.issue.title}`
                    : "Commented on an issue";
            case "CreateEvent":
                return activity.payload.ref_type
                    ? `Created ${activity.payload.ref_type}: ${activity.payload.ref || ""}`
                    : "Created something new";
            default:
                return `${activity.type} on ${activity.repo.name}`;
        }
    };

    return (
        <section className="py-8 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6 flex items-center">
                <span className="mr-2">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </span>
                NoamFav's Recent Git Activity
            </h2>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                {loading ? (
                    <div className="flex items-center justify-center h-40 text-gray-500">
                        <div className="text-center">
                            <svg
                                className="w-12 h-12 mx-auto mb-2 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            <p>Loading Git activity...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-40 text-gray-500">
                        <div className="text-center">
                            <svg
                                className="w-12 h-12 mx-auto mb-2 text-red-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p>{error}</p>
                            <button
                                onClick={fetchGitActivity}
                                className="mt-3 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-blue-200 rounded-lg transition-colors duration-200"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                ) : activities.length === 0 ? (
                    <div className="flex items-center justify-center h-40 text-gray-500">
                        <div className="text-center">
                            <svg
                                className="w-12 h-12 mx-auto mb-2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <p>No GitHub activity found for NoamFav</p>
                            <button
                                onClick={fetchGitActivity}
                                className="mt-3 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-blue-200 rounded-lg transition-colors duration-200"
                            >
                                Refresh Activity
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200"
                            >
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 text-blue-400">
                                        {getEventIcon(activity.type)}
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <div className="flex justify-between">
                                            <p className="font-medium text-white">
                                                {activity.repo.name}
                                            </p>
                                            <span className="text-xs text-gray-400">
                                                {formatDate(
                                                    activity.created_at,
                                                )}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-gray-300">
                                            {getEventDescription(activity)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="text-center mt-4">
                            <button
                                onClick={fetchGitActivity}
                                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-blue-200 rounded-lg transition-colors duration-200"
                            >
                                Refresh Activity
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GitActivity;
