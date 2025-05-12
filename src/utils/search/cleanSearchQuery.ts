import { normalizeText } from "../text/normalizeText";

export const cleanSearchQuery = (query: string) => {
    const normalized = normalizeText(query);
    const parts = normalized.split(" ").map(word => {
        if (word.length > 4 && word.endsWith("s")) return word.slice(0, -1);
        return word;
    });
    return parts.join(".*");
}