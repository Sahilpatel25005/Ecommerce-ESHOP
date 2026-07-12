const getCookieToken = () => {
  if (typeof document === "undefined") return null;

  const accessTokenCookie = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("access_token="));

  return accessTokenCookie
    ? decodeURIComponent(accessTokenCookie.slice("access_token=".length)).replace(/^"|"$/g, "")
    : null;
};

const apiCall = async (endpoint, method = "GET", body = null, isFormData = false) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  try {
    const token = getCookieToken();
    const options = {
      method,
      headers: {},
      credentials: "include",
    };

    // Only add JSON Content-Type if NOT sending FormData
    if (!isFormData) {
      options.headers["Content-Type"] = "application/json";
    }

    if (body) {
      options.body = isFormData ? body : JSON.stringify(body);
    }

    if (token) {
      options.headers["Authorization"] = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
    }

    const response = await fetch(`${baseUrl}${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "API Error");
    }

    if (response.status !== 204) {
      return await response.json();
    }

    return null;
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
};

export default apiCall;
