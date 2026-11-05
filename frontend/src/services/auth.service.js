
import API_URL from "./api";

// Signup API
export const signupUser = async (userData) => {
    const response = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || data.error || "Signup failed");
    }

    return data;
};

// Login API
export const loginUser = async (userData) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || data.error || "Login failed");
    }

    localStorage.setItem("token", data.token);

    return data;
};
