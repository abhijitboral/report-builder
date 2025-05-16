import { BrowserRouter, Routes, Route } from "react-router-dom";
import DynamcLogin from "../components/DynamicLoging";
import Sidebar from "../components/Sidebar";
import DynamicLayout from "../components/DynamicLayout";
import DynamicSignup from "../components/DynamicSignup";
import AddMerchant from "../components/merchant/AddMerchant";
import DynamicContent from "../components/DynamicContent";
import DynamicUsers from "../components/DynamicUsers";
import EditUser from "../components/EditUser";
import PrivateRoute from "./PrivateRoute";
import UserSettings from "../components/UserSettings";
import ResetPassword from "../components/ResetPassword";

const DynamicRouter = () => {
	return (
		<Routes>
			<Route index element={<DynamcLogin />} />
			<Route path="/signup" element={<DynamicSignup />} />
			<Route path="/reset-password" element={<ResetPassword />} />
			<Route path="/" element={<DynamicLayout />}>
				<Route path="/" element={<Sidebar />} />
				<Route path="/dashboard" element={<DynamicContent />} />
				<Route
					path="/users"
					element={
						<PrivateRoute roles={["admin"]}>
							<DynamicUsers />
						</PrivateRoute>
					}
				/>
				<Route path="/users/edit/:id" element={<EditUser />} />
				<Route path="/add_merchant" element={<AddMerchant />} />
				<Route path="/settings" element={<UserSettings />} />
			</Route>
		</Routes>
	);
};
export default DynamicRouter;
