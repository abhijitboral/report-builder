import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
const DynamicLogout = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("user");
		message.success("Logged out successfully");
		navigate("/");
	};
	return (
		<>
			<Button type="primary" onClick={handleLogout}>
				Log Out
			</Button>
		</>
	);
};

export default DynamicLogout;
