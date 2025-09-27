const apiCall = async (endpoint, method = "GET", body = null, isFormData = false) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  try {
    const token = localStorage.getItem("token");

    const options = {
      method,
      headers: {},
    };

    // Only add JSON Content-Type if NOT sending FormData
    if (!isFormData) {
      options.headers["Content-Type"] = "application/json";
    }

    if (body) {
      options.body = isFormData ? body : JSON.stringify(body);
    }

    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
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
