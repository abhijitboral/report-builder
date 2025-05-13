import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;
import {
	Form,
	Input,
	Button,
	Checkbox,
	Typography,
	Space,
	message,
} from "antd";
import logo from "../assets/react.svg";
import { useAuth } from "./contexts/AuthContext";

const { Link, Title } = Typography;
const DynamcLogin = () => {
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const onFinish = async (values) => {
		//console.log("Success:", values);
		const { email, password } = values;
		setLoading(true);
		setError(null); // Reset any previous errors
		try {
			// Make the POST request to your login endpoint
			const result = await axios.post(`${API_URL}/users/login`, {
				email,
				password,
			});

			// Handle success (e.g., save the token, redirect, etc.)
			message.success("Login successful!");
			delete result.data.response.data["password"];
			console.log("Login Successful:", result.data.response.data.role);

			// Save the token in localStorage or sessionStorage
			localStorage.setItem("authToken", result.data.response.token);
			localStorage.setItem("user", JSON.stringify(result.data.response.data));
			localStorage.setItem("role", result.data.response.data.role);

			if (result.data.response.token) {
				login(
					result.data.response.token,
					result.data.response.data,
					result.data.response.data.role
				);
				if (result.data.response.data.role === "user") {
					navigate("/dashboard");
				} else {
					navigate("/users");
				}
			}
		} catch (error) {
			console.log(error.response.data.message);
			setError(error.response ? error.response.data.message : "Login failed");
			message.error(
				error.response ? error.response.data.message : "Login failed"
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
			{/* Logo Section */}
			<div style={{ textAlign: "center", marginBottom: 24 }}>
				{/* Replace with your actual logo */}
				<img src={logo} alt="Logo" style={{ width: 80, marginBottom: 16 }} />
				<Title level={2} style={{ margin: 0 }}>
					<span style={{ fontWeight: "bold" }}>Report</span> Builder
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
						name="email"
						rules={[
							{ required: true, message: "Please input your Email Address!" },
							{ type: "email", message: "The input is not valid E-mail!" },
						]}>
						<Input placeholder="Email Address" size="large" />
					</Form.Item>

					<Form.Item
						name="password"
						rules={[
							{ required: true, message: "Please input your Password!" },
						]}>
						<Input.Password placeholder="Password" size="large" />
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							block
							size="large"
							style={{ backgroundColor: "#d63d52", borderColor: "#d63d52" }}>
							{loading ? "Logging in..." : "Login"}
						</Button>
					</Form.Item>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: 16,
						}}>
						<NavLink to="/signup">Create a new account</NavLink>
						<Link href="#">Reset Password</Link>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default DynamcLogin;
