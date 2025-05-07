import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const UserContext = createContext();
export const useUsers = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchUsers = async () => {
		try {
			const token = localStorage.getItem("authToken");
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
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<UserContext.Provider value={{ users, loading, fetchUsers }}>
			{children}
		</UserContext.Provider>
	);
};
