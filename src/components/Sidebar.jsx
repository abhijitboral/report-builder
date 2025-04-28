import React, { useState } from "react";
import { Layout, Menu, Button, DatePicker, Select, Table, Tabs } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import DynamicMenu from "./DynamicMenu";
const { Sider } = Layout;

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={() => setCollapsed(!collapsed)}>
			<div
				className="logo"
				style={{
					height: "64px",
					margin: "16px 0",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}>
				{collapsed ? (
					<MenuOutlined style={{ fontSize: "24px", color: "#fff" }} />
				) : (
					<h1 style={{ color: "#fff", margin: 0 }}>Report Builder</h1>
				)}
			</div>
			<DynamicMenu />
		</Sider>
	);
};

export default Sidebar;
