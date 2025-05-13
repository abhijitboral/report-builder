import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("authToken"));
	const [role, setRole] = useState(localStorage.getItem("role"));
	const [userData, setuserData] = useState(
		JSON.parse(localStorage.getItem("user"))
	);

	const login = (token, user_data, user_role) => {
		console.log("login function " + JSON.stringify(user_data));
		setToken(token);
		setuserData(user_data);
		setRole(user_role);
	};
	const logout = () => {
		setToken(null);
		setuserData(null);
		localStorage.removeItem("authToken");
	};

	return (
		<AuthContext.Provider value={{ token, userData, role, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
