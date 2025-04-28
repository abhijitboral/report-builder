import { BrowserRouter, Routes, Route } from "react-router-dom";
import DynamcLogin from "../components/DynamicLoging";
import Sidebar from "../components/Sidebar";
import DynamicLayout from "../components/DynamicLayout";
import DynamicSignup from "../components/DynamicSignup";
import AddMerchant from "../components/merchant/AddMerchant";
import DynamicContent from "../components/DynamicContent";

const DynamicRouter = () => {
	return (
		<Routes>
			<Route index element={<DynamcLogin />} />
			<Route path="/signup" element={<DynamicSignup />} />
			<Route path="/" element={<DynamicLayout />}>
				<Route path="/" element={<Sidebar />} />
				<Route path="/dashboard" element={<DynamicContent />} />
				<Route path="/add_merchant" element={<AddMerchant />} />
			</Route>
		</Routes>
	);
};
export default DynamicRouter;
