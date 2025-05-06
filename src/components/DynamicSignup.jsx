import React, { useState } from "react";
import {
	Form,
	Input,
	Button,
	Checkbox,
	Typography,
	Space,
	message,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/react.svg";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const { Link, Title } = Typography;
const DynamcSignup = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const onFinish = async (values) => {
		//console.log("Success:", values);
		const { username, email, password } = values;
		setLoading(true);
		setError(null);
		try {
			// Make the POST request to your login endpoint
			const response = await axios.post(`${API_URL}/users/register`, {
				username,
				email,
				password,
			});
			if (response.status === 201) {
				message.success("Your account has been created!");
				navigate("/users");
			}
		} catch (error) {
			setError(
				error.response
					? error.response.data.error
					: "Opps! someting went wrong. Please try again."
			);
			message.error(
				error.response
					? error.response.data.error
					: "Opps! someting went wrong. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<div
			style={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				background: "#f9f9f9",
			}}>
			<div style={{ textAlign: "center", marginBottom: 24 }}>
				{/* Replace with your actual logo */}
				<img src={logo} alt="Logo" style={{ width: 80, marginBottom: 16 }} />
				<Title level={2} style={{ margin: 0 }}>
					<span style={{ fontWeight: "bold" }}>Report</span> Builder
					<br /> <span style={{ letterSpacing: 4 }}>Create a new account</span>
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
				{error && <p style={{ color: "red" }}>{error}</p>}
				<Form
					name="login"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					layout="vertical">
					<Form.Item
						name="username"
						rules={[
							{ required: true, message: "Please enter your Username!" },
						]}>
						<Input placeholder="Username" size="large" />
					</Form.Item>
					<Form.Item
						name="email"
						rules={[
							{ required: true, message: "Please enter your Email Address!" },
							{ type: "email", message: "The input is not valid E-mail!" },
						]}>
						<Input placeholder="Email Address" size="large" />
					</Form.Item>

					<Form.Item
						name="password"
						rules={[
							{ required: true, message: "Please enter your Password!" },
						]}>
						<Input.Password placeholder="Password" size="large" />
					</Form.Item>
					<Form.Item
						name="confirm_password"
						dependencies={["password"]}
						rules={[
							{ required: true, message: "Please enter Confirm Password!" },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error("Passwords do not match!"));
								},
							}),
						]}>
						<Input.Password placeholder="Confirm Password" size="large" />
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							block
							size="large"
							style={{ backgroundColor: "#d63d52", borderColor: "#d63d52" }}>
							Create new account
						</Button>
					</Form.Item>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: 16,
						}}></div>
				</Form>
			</div>
		</div>
	);
};

export default DynamcSignup;
