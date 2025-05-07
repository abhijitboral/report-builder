import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Form, Input, Button, Select, Typography } from "antd";
import axios from "axios";

const { Title } = Typography;
const API_URL = import.meta.env.VITE_API_BASE_URL;

const EditUser = () => {
	const token = localStorage.getItem("authToken");
	//const [user, setUser] = useState([]);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const getUser = async () => {
		try {
			if (token) {
				const res = await axios.get(`${API_URL}/users/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				console.log(res.data);
				form.setFieldsValue({
					username: res.data.username,
					email: res.data.email,
					role: res.data.role,
				});
			} else {
				navigate("/");
			}
		} catch (error) {
			console.error("Failed to fetch users:", error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getUser();
	}, [id, form, token]);

	const onFinish = (values) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<>
			<div
				style={{
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					background: "#f9f9f9",
				}}>
				{/* Logo Section */}
				<div style={{ textAlign: "center", marginBottom: 24 }}>
					{/* Replace with your actual logo */}
					<Title level={2} style={{ margin: 0 }}>
						<span style={{ fontWeight: "bold" }}>Update User Details</span>
					</Title>
				</div>

				{/* Form Card */}
				<div
					style={{
						width: 350,
						background: "#fff",
						padding: 32,
						borderRadius: 16,
						boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
					}}>
					<Form
						name="login"
						form={form}
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						layout="vertical">
						<Form.Item
							name="username"
							rules={[
								{ required: true, message: "Please enter your user name!" },
							]}>
							<Input placeholder="User Name" size="large" value="test" />
						</Form.Item>
						<Form.Item
							name="email"
							rules={[
								{ required: true, message: "Please enter your email!" },
								{ type: "email", message: "The input is not valid E-mail!" },
							]}>
							<Input placeholder="Email" size="large" />
						</Form.Item>
						<Form.Item
							name="role"
							rules={[{ required: true, message: "Please select a Role!" }]}>
							<Select placeholder="Select a role" defaultValue="" allowClear>
								<Option value="">Select a role</Option>
								<Option value="user">User</Option>
								<Option value="admin">Admin</Option>
							</Select>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								block
								size="large"
								style={{ backgroundColor: "#d63d52", borderColor: "#d63d52" }}>
								Update
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
};

export default EditUser;
