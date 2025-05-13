import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	Layout,
	Form,
	Input,
	Button,
	Select,
	Typography,
	message,
	Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "./contexts/AuthContext";

const { Title } = Typography;
const API_URL = import.meta.env.VITE_API_BASE_URL;

const EditUser = () => {
	const [user, setUser] = useState([]);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const { token, userData } = useAuth();
	const getUser = async () => {
		//console.log(`Userdata - ${JSON.stringify(userData.id)}`);
		try {
			if (token) {
				form.setFieldsValue(userData);
			} else {
				navigate("/");
			}
		} catch (error) {
			console.error("Failed to fetch users:", error);
			if (error.response.data.message === "Invalid token") {
				navigate("/");
			}
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getUser();
	}, [id, form, token]);

	const onFinish = async (values) => {
		console.log("Success:", `${token}`);
		//return false;
		try {
			if (token) {
				const res = await axios.post(`${API_URL}/users/edit/${id}`, values, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				console.log(res.data.message);
				message.success("User updated successfully");
				setTimeout(() => {
					navigate("/users");
				}, 2000);
			} else {
				navigate("/");
			}
		} catch (error) {
			message.error("Failed to update user");
			console.error("Failed to fetch users:", error);
			if (error.response.data.message === "Invalid token") {
				navigate("/");
			}
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const props = {
		name: "profileImage",
		action: "http://localhost:3000/api/upload-profile", // Fastify endpoint
		headers: {
			Authorization: `Bearer ${token}`,
		},
		onChange(info) {
			if (info.file.status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
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
						<span style={{ fontWeight: "bold" }}>Profile Settings</span>
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
						{/* <Form.Item
							name="role"
							rules={[{ required: true, message: "Please select a Role!" }]}>
							<Input placeholder="role" size="large" readOnly />
						</Form.Item> */}
						<Form.Item>
							<Upload {...props} accept="image/*" showUploadList={false}>
								<Button icon={<UploadOutlined />}>Upload Profile Image</Button>
							</Upload>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								block
								size="large"
								style={{ backgroundColor: "#d63d52", borderColor: "#d63d52" }}>
								Update your profile
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
};

export default EditUser;
