import React from "react";
import { Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DynamicHeader from "./DynamicHeader";
//import DynamicContent from "./DynamicContent";

const DynamicLayout = () => {
	const isAuthenticated = !!localStorage.getItem("authToken"); // Check token
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sidebar />
			<Layout className="site-layout">
				{/* <DynamicHeader />
				{isAuthenticated ? <Outlet /> : <Navigate to="/" replace />} */}
				{isAuthenticated ? (
					<>
						<DynamicHeader />
						<Outlet />
					</>
				) : (
					<Navigate to="/" replace />
				)}
			</Layout>
		</Layout>
	);
};

export default DynamicLayout;
