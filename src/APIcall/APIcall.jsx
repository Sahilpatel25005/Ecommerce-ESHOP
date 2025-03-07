// ****************************** reusable function for api call ************************************

const apiCall = async (endpoint, method = "GET", body = null) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  try {
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
  } finally {
    // store.dispatch(setLoading(false))
  }
};

export default apiCall;

// // Inside apiCall function

// const apiCall = async (endpoint, method = "GET", body = null, setError) => {
//   // Accept setError as an argument
//   const baseUrl = import.meta.env.VITE_BASE_URL;

//   try {
//     const token = localStorage.getItem("token");

//     const options = {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     if (body) {
//       options.body = JSON.stringify(body);
//     }

//     if (token) {
//       options.headers["Authorization"] = `Bearer ${token}`;
//     }

//     const response = await fetch(`${baseUrl}${endpoint}`, options);

//     if (!response.ok) {
//       const errorData = await response.json(); // Return JSON data if any

//       // Check for token expiration (e.g., status code 401 or error detail related to expired token)
//       if (
//         response.status === 401 &&
//         errorData.detail &&
//         errorData.detail.includes("expired")
//       ) {
//         // Handle token expiration (redirect user to login page or show an error)
//         localStorage.removeItem("token"); // Remove the expired token
//         setError("Your session has expired. Please log in again."); // Show the error in the UI
//         throw new Error("Your session has expired. Please log in again.");
//       } else {
//         throw new Error(errorData.detail || "An error occurred");
//       }
//     }

//     if (response.status !== 204) {
//       return await response.json(); // Return JSON data if any
//     }

//     return null; // Handle cases where no response body is expected
//   } catch (error) {
//     console.error("Error in API call:", error);
//     setError(error.message); // Set the error in UI state
//     throw error; // Rethrow the error for further handling
//   }
// };

// export default apiCall;
