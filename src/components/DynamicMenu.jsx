import { Layout, Menu, Button, DatePicker, Select, Table, Tabs } from "antd";
import {
	DashboardOutlined,
	FunnelPlotOutlined,
	LineChartOutlined,
	SettingOutlined,
} from "@ant-design/icons";
const { MenuItem, SubMenu } = Menu;
const DynamicMenu = () => {
	return (
		<Menu>
			<MenuItem>Dashboard</MenuItem>
		</Menu>
	);
};
export default DynamicMenu;
