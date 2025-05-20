import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;
import { useAuth } from "./AuthContext";

const UserContext = createContext();
export const useUsers = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
	const { token } = useAuth();
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchUsers = async () => {
		try {
			if (token) {
				const res = await axios.get(`${API_URL}/users/`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setUsers(res.data);
			}
		} catch (err) {
			console.error("Failed to fetch users:", err);
			if (err.response.data.message === "Invalid token") {
				navigate("/");
			}
		} finally {
			setLoading(false);
		}
	};
	/* useEffect(() => {
		if (token) {
			fetchUsers();
		}
	}, [token]); */
	return (
		<UserContext.Provider value={{ users, loading, fetchUsers }}>
			{children}
		</UserContext.Provider>
	);
};
