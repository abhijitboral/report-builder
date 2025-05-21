import React, { useState, useEffect } from "react";
import {
	Form,
	Input,
	Button,
	Checkbox,
	Typography,
	Space,
	message,
	Spin,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/react.svg";
import { useAuth } from "./contexts/AuthContext";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const { Link, Title } = Typography;
const DynamcSignup = () => {
	const navigate = useNavigate();
	const { token } = useAuth();
	useEffect(() => {
		if (token) {
			//navigate("/dashboard");
		}
	}, [token]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const onFinish = async (values) => {
		setLoading(true);
		const { email, password } = values;
		setError(null);
		try {
			const response = await axios.post(`${API_URL}/users/reset-password`, {
				email,
				password,
			});
			console.log(JSON.stringify(response));
			if (response.status === 200) {
				message.success("Your password has been changed!");
				navigate("/");
			}
		} catch (error) {
			console.log(JSON.stringify(error));
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
					<br /> <span style={{ letterSpacing: 4 }}>Reset your password</span>
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
				<Spin spinning={loading} tip="Loading users...">
					<Form
						name="login"
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						layout="vertical">
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
								{
									pattern:
										/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
									message:
										"Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
								},
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
								Update your password
							</Button>
						</Form.Item>
					</Form>
				</Spin>
			</div>
		</div>
	);
};
export default DynamcSignup;
