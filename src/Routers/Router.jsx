import { BrowserRouter, Routes, Route } from "react-router-dom";
import DynamcLogin from "../components/DynamicLoging";
import Sidebar from "../components/Sidebar";
import DynamicLayout from "../components/DynamicLayout";
import DynamicSignup from "../components/DynamicSignup";

const DynamicRouter = () => {
	return (
		<Routes>
			<Route index element={<DynamcLogin />} />
			<Route path="/signup" element={<DynamicSignup />} />
			<Route>
				<Route path="/" element={<Sidebar />} />
				<Route path="/dashboard" element={<DynamicLayout />} />
			</Route>
		</Routes>
	);
};
export default DynamicRouter;
