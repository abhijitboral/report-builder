import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "./contexts/UserContext";
import { Layout, Button, Table, Tabs, Popconfirm, Spin, message } from "antd";
import axios from "axios";
import { useAuth } from "./contexts/AuthContext";
const { Content } = Layout;
const API_URL = import.meta.env.VITE_API_BASE_URL;

const DynamicUsers = () => {
	const { users, loading, fetchUsers } = useUsers();
	const [loader, setloader] = useState(false);
	const navigate = useNavigate();
	const { token } = useAuth();

	const handleDelete = async (id) => {
		console.log(token);
		setloader(true);
		//return false;
		try {
			await axios.post(
				`${API_URL}/users/delete/${id}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			message.success("User deleted successfully");
			fetchUsers(); // refresh list
		} catch (error) {
			message.error("Error deleting user");
			console.error(error);
		} finally {
			setloader(false);
		}
	};

	useEffect(() => {
		if (token) fetchUsers();
	}, []);
	// Table columns definition
	const tableColumns = [
		{
			title: "Username",
			dataIndex: "username",
			key: "username",
			sorter: (a, b) => a.username.localeCompare(b.username),
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			sorter: (a, b) => a.email.localeCompare(b.email),
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
			sorter: (a, b) => a.role.localeCompare(b.role),
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (_, users) => (
				<span>
					<Button
						type="link"
						onClick={() => navigate(`/users/edit/${users.id}`)}>
						Edit
					</Button>
					<Popconfirm
						title="Are you sure to delete this user?"
						onConfirm={() => handleDelete(users.id)}
						okText="Yes"
						cancelText="No">
						<Button danger>Delete</Button>
					</Popconfirm>
				</span>
			),
		},
	];
	const tabItems = [
		{
			key: "1",
			label: "Users",
			children: (
				<Table
					dataSource={users}
					columns={tableColumns}
					/* pagination={true} */
					rowKey="id"
					pagination={{ pageSize: 10 }}
				/>
			),
		},
	];
	/* if (loading) return <Spin tip="Loading users..." />; */
	if (loader) return <Spin tip="Deleting users..." />;
	return (
		<Content
			style={{
				margin: "24px 16px",
				padding: 24,
				minHeight: 280,
				backgroundColor: "#fff",
			}}>
			<Spin spinning={loading} tip="Loading users...">
				<Tabs
					defaultActiveKey="1"
					items={tabItems}
					style={{ marginBottom: 16 }}
				/>
			</Spin>
		</Content>
	);
};
export default DynamicUsers;
