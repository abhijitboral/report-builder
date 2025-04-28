import React from "react";
import { Form, Input, Button, Checkbox, Typography, Space } from "antd";
import logo from "../assets/react.svg";

const { Link, Title } = Typography;
const DynamcSignup = () => {
	/* const onFinish = (values) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	}; */
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
				<Form
					name="login"
					initialValues={{ remember: true }}
					/* onFinish={onFinish} */
					/* onFinishFailed={onFinishFailed} */
					layout="vertical">
					<Form.Item
						name="username"
						rules={[
							{ required: true, message: "Please input your Username!" },
						]}>
						<Input placeholder="Username" size="large" />
					</Form.Item>
					<Form.Item
						name="email"
						rules={[
							{ required: true, message: "Please input your Email Address!" },
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
					<Form.Item
						name="confirm_password"
						rules={[{ required: true, message: "Must be match Password!" }]}>
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
