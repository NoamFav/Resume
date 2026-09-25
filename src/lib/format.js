export function formatDate(dateString, format = "short") {
    if (!dateString) return "Present";
    // A bare year ("2023") is as precise as the résumé claims to be
    if (/^\d{4}$/.test(dateString)) return dateString;
    const date = new Date(dateString);
    const month = date.toLocaleString("en-GB", {
        month: format === "short" ? "short" : "long",
    });
    return `${month} ${date.getFullYear()}`;
}

// 2024-10-12 -> 2024-10, the way git log --date=short-ish reads
export const ym = (dateString) => (dateString ? dateString.slice(0, 7) : "now    ");

export function isOngoing(endDate) {
    return !endDate || new Date(endDate) > new Date();
}

// Current roles first, then everything else newest first, the way a résumé reads
export const byRecent = (a, b) =>
    isOngoing(b.end_date) - isOngoing(a.end_date) ||
    new Date(b.start_date) - new Date(a.start_date);

export function proficiencyLevel(percentage) {
    if (percentage >= 90) return "Expert";
    if (percentage >= 70) return "Advanced";
    if (percentage >= 50) return "Intermediate";
    if (percentage >= 30) return "Beginner";
    return "Learning";
}

// A stable fake commit hash, so each entry keeps its "sha" between visits
export const sha = (text) => {
    let h = 0x811c9dc5;
    for (const c of text) {
        h ^= c.charCodeAt(0);
        h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
};

export const slug = (s) =>
    s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
