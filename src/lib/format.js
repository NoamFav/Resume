export function formatDate(dateString, format = "short") {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    const month = date.toLocaleString("default", {
        month: format === "short" ? "short" : "long",
    });
    return `${month} ${date.getFullYear()}`;
}

export function isOngoing(endDate) {
    return !endDate || new Date(endDate) > new Date();
}

export function proficiencyLevel(percentage) {
    if (percentage >= 90) return "Expert";
    if (percentage >= 70) return "Advanced";
    if (percentage >= 50) return "Intermediate";
    if (percentage >= 30) return "Beginner";
    return "Learning";
}
