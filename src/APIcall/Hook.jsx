import { useDispatch } from "react-redux";

import { setLoading } from "../components/Slice/LoadingSlice";

const useApiCall = () => {
  const dispatch = useDispatch();

  const apiCall = async (action) => {
    try {
      dispatch(setLoading(true)); // Start loading
      await dispatch(action).unwrap(); // Wait for the API call to complete
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      dispatch(setLoading(false)); // Stop loading after completion (success or error)
    }
  };
  return apiCall;
};
export default useApiCall;
