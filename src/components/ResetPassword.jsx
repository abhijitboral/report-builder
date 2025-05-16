import React, { useState } from "react";
import logo from "../assets/react.svg";
import {
	Form,
	Input,
	Button,
	Checkbox,
	Typography,
	Space,
	message,
} from "antd";
const { Link, Title } = Typography;
import axios from "axios";

const ResetPassword = () => {
	const [loading, setLoading] = useState(false);

	const onFinish = async (values) => {
		setLoading(true);
		try {
			const response = await axios.post(
				"http://localhost:3000/api/users/reset-password",
				{
					email: values.email,
					newPassword: values.newPassword,
				}
			);
			message.success(response.data.message);
		} catch (error) {
			message.error(error.response?.data?.message || "Reset failed.");
		} finally {
			setLoading(false);
		}
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
					<span style={{ fontWeight: "bold" }}>Reset</span> Password
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
				{/* {error && <p style={{ color: "red" }}>{error}</p>} */}
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
						<Link href="/reset-password">Reset Password</Link>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default ResetPassword;
