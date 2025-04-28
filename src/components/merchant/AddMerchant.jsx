import { Layout, Form, Input, Button, Checkbox, Typography, Space } from "antd";
const { Title } = Typography;
const AddMerchant = () => {
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
						<span style={{ fontWeight: "bold" }}>Add Merchant</span>
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
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						layout="vertical">
						<Form.Item
							name="merchant"
							rules={[
								{ required: true, message: "Please input merchant name!" },
							]}>
							<Input placeholder="Merchent Name" size="large" />
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								block
								size="large"
								style={{ backgroundColor: "#d63d52", borderColor: "#d63d52" }}>
								Add Merchant
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
};
export default AddMerchant;
