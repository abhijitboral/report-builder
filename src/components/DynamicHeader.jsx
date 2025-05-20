import React, { useState } from "react";
import {
	Layout,
	Menu,
	Button,
	DatePicker,
	Select,
	Table,
	Tabs,
	Typography,
	Avatar,
	Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import DynamicLogout from "./DynamicLogout";
import { useAuth } from "./contexts/AuthContext";
const { Header } = Layout;
const { Text } = Typography;
const { Option } = Select;
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;
const DynamicHeader = () => {
	const [selectedAttribute, setSelectedAttribute] = useState("visits");
	const user = useAuth();
	console.log("Users" + JSON.stringify(user));
	const handleAttributeChange = (value) => {
		setSelectedAttribute(value);
	};
	const [dateRange, setDateRange] = useState([
		dayjs("2025-04-22"),
		dayjs("2025-04-28"),
	]);
	const handleDateChange = (dates) => {
		if (dates) {
			setDateRange(dates);
		}
	};
	return (
		<Header
			className="site-layout-background"
			style={{
				padding: 16,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}>
			<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
				<DatePicker.RangePicker
					value={dateRange}
					onChange={handleDateChange}
					defaultValue={[dayjs("2025-04-22"), dayjs("2025-04-28")]}
				/>
				<Button type="primary">Load Data</Button>
				<Button>Standard Reports</Button>
				<Button>Saved Views</Button>
				<Select
					defaultValue="entranceTime"
					style={{ width: 180 }}
					onChange={handleAttributeChange}>
					<Option value="entranceTime">Use Entrance Time</Option>
					<Option value="exitTime">Use Exit Time</Option>
					<Option value="duration">Use Duration</Option>
				</Select>
			</div>
			<div>
				<Header
					style={{
						backgroundColor: "#001529",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						padding: "0 24px",
						height: "64px",
					}}>
					<Space>
						{user.userData.profileImage && (
							<Avatar
								src={`${BACKEND_API_URL}/uploads/${user.userData.profileImage}`}
								alt="Profile"
								width="25"
								style={{ borderRadius: "50%" }}
							/>
						)}
						<Text
							strong
							style={{
								color: "#fff",
							}}>
							Welcome, {user.userData.username && user.userData.username}
						</Text>
					</Space>
				</Header>
			</div>
			<div>
				{/* <Button type="primary" icon={<PlusOutlined />}>
					Create Asset
				</Button> */}
				<DynamicLogout />
			</div>
		</Header>
	);
};
export default DynamicHeader;
