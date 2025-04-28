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
			{/* <DynamicMenu /> */}
			{/* <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
						<MenuItem key="1" icon={<DashboardOutlined />}>
							Dashboard
						</MenuItem>
						<MenuItem key="2" icon={<FunnelPlotOutlined />}>
							Funnels
						</MenuItem>
						<MenuItem key="3" icon={<LineChartOutlined />}>
							Reporting
							<Menu.SubMenu key="sub1" title="Reporting">
								<MenuItem key="4">Report Builder</MenuItem>
								<MenuItem key="5">Campaign Analysis</MenuItem>
								<MenuItem key="6">Raw Events</MenuItem>
								<MenuItem key="7">Integrated Reporting</MenuItem>
							</Menu.SubMenu>
						</MenuItem>
						<MenuItem key="8" icon={<SettingOutlined />}>
							Data Updates
						</MenuItem>
						<MenuItem key="9">Labs</MenuItem>
					</Menu> */}
		</Sider>
	);
};

export default Sidebar;
