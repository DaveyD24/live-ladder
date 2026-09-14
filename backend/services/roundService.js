export function CurrentRound() {
    //7pm on the Thursday of Round 1
    const startDate = new Date("2026-03-05T19:00:00+11:00");

    const now = new Date();
    const diffMs = now - startDate;
    const weeks = diffMs / (1000 * 60 * 60 * 24 * 7);

    return Math.min(Math.floor(weeks) + 1, 27);
}

export function randomSeason(minYear, maxYear) {
    return Math.floor(Math.random() * (maxYear - minYear + 1) + minYear);
}

export function randomRound(minRound, maxRound) {
    return Math.floor(Math.random() * (maxRound - minRound + 1) + minRound);
}