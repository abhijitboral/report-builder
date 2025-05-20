import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Layout,
	Form,
	Input,
	Button,
	Select,
	Typography,
	message,
	Upload,
	Image,
	Card,
	Spin,
	Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "./contexts/AuthContext";

const { Title } = Typography;
const API_URL = import.meta.env.VITE_API_BASE_URL;
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

const UserSettings = () => {
	const [user, setUser] = useState([]);
	const [uploadStatus, SetUploadStatus] = useState();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const { token, userData, login } = useAuth();
	const getUser = async () => {
		try {
			if (token) {
				console.log("get userdata : " + JSON.stringify(userData));
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
	}, [form, token, userData]);

	const onFinish = async (values) => {
		const id = userData.id;
		console.log("Success:", `${id}`);
		//return false;
		try {
			if (token) {
				const res = await axios.post(`${API_URL}/users/profile/${id}`, values, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				//console.log("role - " + userData.role);
				login(token, res.data.user, userData.role);
				//localStorage.setItem("user", JSON.stringify(res.data.user));
				message.success("User updated successfully");
				navigate("/users");
			} else {
				navigate("/");
			}
		} catch (error) {
			message.error("Failed to update user");
			console.error("Failed to fetch users:", error);
			if (error.message === "Invalid token") {
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
		action: `${API_URL}/users/upload-profile`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		onChange(info) {
			//console.log("Info " + JSON.stringify(info));
			try {
				let file_name = info.fileList[0]?.response?.imageUrl;
				file_name = file_name.split("/").pop();
				console.log("file name : " + file_name);
				if (info.file.status === "done") {
					const updatedUserData = {
						...userData,
						profileImage: file_name,
					};
					console.log("After upload" + JSON.stringify(updatedUserData));
					//localStorage.removeItem("user");
					login(token, updatedUserData, userData.role);
					SetUploadStatus(`${info.file.name} file uploaded successfully`);
					message.success(`${info.file.name} file uploaded successfully`);
				} else if (info.file.status === "error") {
					SetUploadStatus("file upload failed.");
					message.error(`${info.file.name} file upload failed.`);
				}
			} catch (error) {
				if (error.message === "Invalid token") {
					message.error("Failed to update user");
					console.error("Failed to fetch users:", error);
					navigate("/");
				}
			} finally {
				setLoading(false);
			}
		},
	};
	return (
		<>
			<Card
				style={{
					maxWidth: 400,
					margin: "auto",
					textAlign: "center",
					padding: 24,
				}}>
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
						<Spin spinning={loading} tip="Loading users...">
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
										{
											type: "email",
											message: "The input is not valid E-mail!",
										},
									]}>
									<Input placeholder="Email" size="large" />
								</Form.Item>
								{/* <Form.Item
								name="role"
								rules={[{ required: true, message: "Please select a Role!" }]}>
								<Input placeholder="role" size="large" readOnly />
							</Form.Item> */}
								<Form.Item>
									<Space>
										{userData.profileImage && (
											<Image
												src={`${BACKEND_API_URL}/uploads/${userData.profileImage}`}
												alt="Profile"
												width="80"
												style={{
													borderRadius: "50%",
													objectFit: "cover",
													marginBottom: 16,
												}}
											/>
										)}
									</Space>

									<Upload
										{...props}
										accept="image/*"
										showUploadList={false}
										beforeUpload={() => true}>
										<Button icon={<UploadOutlined />}>
											Upload Profile Image
										</Button>
									</Upload>
									<p>{uploadStatus}</p>
								</Form.Item>

								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										block
										size="large"
										style={{
											backgroundColor: "#d63d52",
											borderColor: "#d63d52",
											marginTop: 20,
										}}
										loading={loading}>
										{loading ? "Updating...." : "Update your profile"}
									</Button>
								</Form.Item>
							</Form>
						</Spin>
					</div>
				</div>
			</Card>
		</>
	);
};

export default UserSettings;
