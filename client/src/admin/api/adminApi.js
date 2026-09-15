const API_BASE = "http://localhost:3001/api";

function getToken() {
    return localStorage.getItem("adminToken");
}

async function adminFetch(endpoint, options = {}) {
    const token = getToken();

    const headers = {
        ...(options.body
            ? { "Content-Type": "application/json" }
            : {}),
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${API_BASE}${endpoint}`,
        {
            ...options,
            headers
        }
    );

    if (response.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");

        window.location.href = "/admin/login";

        return;
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Request failed"
        );
    }

    return data;
}

export default adminFetch;