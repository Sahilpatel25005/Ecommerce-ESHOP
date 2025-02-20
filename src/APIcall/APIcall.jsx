// ****************************** reusable function for api call ************************************

// import { setLoading } from "../components/Slice/LoadingSlice";
// import store from "../Store/Store";
 const apiCall = async (endpoint, method = "GET", body = null) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  try {
    

    // dispatch(setLoading(true));
    const token = localStorage.getItem("token");

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${baseUrl}${endpoint}`, options);

    if (!response.ok) {
      const ne = await response.json(); // Return JSON data if any
      throw new Error(ne.detail);
    }

    if (response.status !== 204) {
      return await response.json(); // Return JSON data if any
    }

    return null; // Handle cases where no response body is expected
  } catch (error) {
    console.error("Error in API call:", error);
    throw error; // Rethrow the error for further handling
  }
  finally{
    // store.dispatch(setLoading(false))

  }
};

export default apiCall;
