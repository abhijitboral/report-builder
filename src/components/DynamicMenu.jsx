import { Outlet, NavLink } from "react-router-dom";
import { Layout, Menu, Button, DatePicker, Select, Table, Tabs } from "antd";
import {
	AppstoreOutlined,
	MailOutlined,
	SettingOutlined,
	DashboardOutlined,
	FunnelPlotOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;
const DynamicMenu = () => {
	return (
		<>
			<Menu mode="horizontal">
				{/* <Menu.Item key="mail" icon={<FunnelPlotOutlined />}>
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
				<Menu.Item key="alipay" icon={<SettingOutlined />}>
					<NavLink to="/add_merchant" rel="noopener noreferrer">
						Add Merchant
					</NavLink>
				</Menu.Item>
				{/* <Menu.Item key="upload" icon={<SettingOutlined />}>
					<NavLink to="/" rel="noopener noreferrer">
						Upload
					</NavLink>
				</Menu.Item> */}
			</Menu>
		</>
	);
};
export default DynamicMenu;
