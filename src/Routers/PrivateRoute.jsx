import { Navigate } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";

const PrivateRoute = ({ children, roles = [] }) => {
	const { role } = useAuth();
	console.log("Private " + role);
	if (!role || role !== "admin") {
		return <Navigate to="/dashboard" />;
	}

	/* if (roles.length > 0 && !roles.includes(user.role)) {
		return <Navigate to="/unauthorized" />;
	} */

	return children;
};

export default PrivateRoute;
