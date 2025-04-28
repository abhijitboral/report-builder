import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DynamicHeader from "./DynamicHeader";
import DynamicContent from "./DynamicContent";

const DynamicLayout = () => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sidebar />
			<Layout className="site-layout">
				<DynamicHeader />
				<Outlet />
			</Layout>
		</Layout>
	);
};

export default DynamicLayout;
