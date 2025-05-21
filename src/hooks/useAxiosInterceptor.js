import { useEffect,useNavigate } from "react";
import axios from "axios";
//import { useAuth } from "../components/contexts/AuthContext";

const useAxiosInterceptor = () => {
	//const { logout } = useAuth();
useEffect(() => {
    const interceptor = axios.interceptors.response.use(
		(response) => response,
		(error) => {
			if (
			error.response &&
			error.response.status === 403 &&
			error.response.data.message === "Invalid token"
		){
				//logout(); // call logout from context
				console.log("error " +error.response);
			localStorage.removeItem("authToken");
			localStorage.clear();
				window.location.href = "/";
		}
		return Promise.reject(error);
	}
  );
  console.log("interceptor" + interceptor); 
    // Remove interceptor on unmount
    return () => axios.interceptors.response.eject(interceptor);
  });
};

export default useAxiosInterceptor;
