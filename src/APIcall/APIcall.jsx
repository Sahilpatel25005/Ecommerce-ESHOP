// // ****************************** reusable function for api call ************************************

// const apiCall = async (endpoint, method = "GET", body = null) => {
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
//       const ne = await response.json(); // Return JSON data if any
//       throw new Error(ne.detail);
//     }

//     if (response.status !== 204) {
//       return await response.json(); // Return JSON data if any
//     }

//     return null; // Handle cases where no response body is expected
//   } catch (error) {
//     console.error("Error in API call:", error);
//     throw error; // Rethrow the error for further handling
//   }
// };

// export default apiCall;




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
      const errorData = await response.json(); 

      if (response.status === 401 && errorData.detail && errorData.detail.includes("expired")) {
        console.warn("Token expired. Informing UI...");
        localStorage.removeItem("token"); 
        return Promise.reject(new Error("Token expired. Please log in again.")); 
      }

      return Promise.reject(new Error(errorData.detail || "An error occurred"));
    }

    if (response.status !== 204) {
      return await response.json(); 
    }

    return null;
  } catch (error) {
    console.error("Error in API call:", error);
    return Promise.reject(error); 
  }
};

export default apiCall;

