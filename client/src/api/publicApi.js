import API_BASE from "./api";

export async function fetchPublicData(endpoint, fallbackData) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`);

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.warn(
            `Public API unavailable for ${endpoint}. Using local data.`,
            error
        );

        return fallbackData;
    }
}