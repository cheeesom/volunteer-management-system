/**
 * Volunity API config & shared helpers
 */
const API_BASE_URL = "https://vms-vxae.onrender.com";

const AUTH_STORAGE_KEYS = {
  token: "volunity_token",
  user: "volunity_user",
};

function getAuthToken() {
  return localStorage.getItem(AUTH_STORAGE_KEYS.token);
}

function getStoredUser() {
  const raw = localStorage.getItem(AUTH_STORAGE_KEYS.user);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveAuthSession({ token, user }) {
  if (token) localStorage.setItem(AUTH_STORAGE_KEYS.token, token);
  if (user) localStorage.setItem(AUTH_STORAGE_KEYS.user, JSON.stringify(user));
}

function clearAuthSession() {
  localStorage.removeItem(AUTH_STORAGE_KEYS.token);
  localStorage.removeItem(AUTH_STORAGE_KEYS.user);
}

/**
 * Fetch wrapper for Volunity API
 * @param {string} path - e.g. "/api/v1/auth/register"
 * @param {RequestInit & { auth?: boolean }} options
 */
async function apiRequest(path, options = {}) {
  const { auth = false, headers = {}, ...rest } = options;
  const requestHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...headers,
  };

  if (auth) {
    const token = getAuthToken();
    if (token) requestHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: requestHeaders,
  });

  let data = null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    data = text ? { message: text } : null;
  }

  return { response, data };
}

window.VolunityAPI = {
  API_BASE_URL,
  AUTH_STORAGE_KEYS,
  getAuthToken,
  getStoredUser,
  saveAuthSession,
  clearAuthSession,
  apiRequest,
};
