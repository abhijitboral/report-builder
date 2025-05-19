import { Outlet, NavLink, Link } from "react-router-dom";
import { Layout, Menu, Button, DatePicker, Select, Table, Tabs } from "antd";
import { useAuth } from "./contexts/AuthContext";
import {
	AppstoreOutlined,
	MailOutlined,
	SettingOutlined,
	HomeOutlined,
	UserOutlined,
	DashboardOutlined,
	FunnelPlotOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;

const DynamicMenu = () => {
	const { role } = useAuth();
	const items = [
		{
			label: <Link to="/dashboard">Dashboard</Link>,
			key: "dashboard",
			icon: <HomeOutlined />,
		},
		role === "admin" && {
			label: <Link to="/users">Users</Link>,
			key: "users",
			icon: <UserOutlined />,
		},
		{
			label: <Link to="/settings">Settings</Link>,
			key: "settings",
			icon: <SettingOutlined />,
		},
	].filter(Boolean);
	return (
		<>
			<Menu mode="horizontal" theme="light" items={items} />
			{/* <Menu mode="horizontal">
				<Menu.Item key="mail" icon={<FunnelPlotOutlined />}>
				Reporting
			</Menu.Item>
			<Menu.Item key="app" icon={<AppstoreOutlined />}>
				Navigation Two
			</Menu.Item>
			<SubMenu
				key="SubMenu"
				icon={<SettingOutlined />}
				title="Navigation Three - Submenu">
				<Menu.Item key="setting:1">Option 1</Menu.Item>
				<Menu.Item key="setting:2">Option 2</Menu.Item>
			</SubMenu> */}
			{/* <Menu.Item key="alipay" icon={<SettingOutlined />}>
					<NavLink to="/add_merchant" rel="noopener noreferrer">
						Add Merchant
					</NavLink>
				</Menu.Item> */}
			{/* <Menu.Item key="upload" icon={<SettingOutlined />}>
					<NavLink to="/" rel="noopener noreferrer">
						Upload
					</NavLink>
				</Menu.Item> */}
			{/* </Menu> */}
			{/* <Menu mode="horizontal">
				<NavLink
					to="/dashboard"
					rel="noopener noreferrer"
					key="dashboard"
					icon={<HomeOutlined />}>
					Dashboard
				</NavLink>
			</Menu>
			<Menu mode="horizontal">
				<NavLink
					to="/users"
					rel="noopener noreferrer"
					key="users"
					icon={<UserOutlined />}>
					Users
				</NavLink>
			</Menu>
			<Menu mode="horizontal">
				<NavLink
					to="/settings"
					rel="noopener noreferrer"
					key="settings"
					icon={<SettingOutlined />}>
					Settings
				</NavLink>
			</Menu> */}
		</>
	);
};
export default DynamicMenu;
