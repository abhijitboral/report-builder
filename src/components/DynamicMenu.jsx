import { Layout, Menu, Button, DatePicker, Select, Table, Tabs } from "antd";
import {
	AppstoreOutlined,
	MailOutlined,
	SettingOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;
const DynamicMenu = () => {
	return (
		<Menu mode="horizontal">
			<Menu.Item key="mail" icon={<MailOutlined />}>
				Navigation One
			</Menu.Item>
			<Menu.Item key="app" icon={<AppstoreOutlined />}>
				Navigation Two (disabled)
			</Menu.Item>
			<SubMenu
				key="SubMenu"
				icon={<SettingOutlined />}
				title="Navigation Three - Submenu">
				<Menu.Item key="setting:1">Option 1</Menu.Item>
				<Menu.Item key="setting:2">Option 2</Menu.Item>
			</SubMenu>
			{/* <Menu.Item key="alipay">
				<a href="https://ant.design" target="_blank" rel="noopener noreferrer">
					Navigation Four - Link
				</a>
			</Menu.Item> */}
		</Menu>
	);
};
export default DynamicMenu;
