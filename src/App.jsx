import React from "react";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import DynamicHeader from "./components/DynamicHeader";
import DynamicContent from "./components/DynamicContent";
function App() {
	return (
		<>
			<Layout style={{ minHeight: "100vh" }}>
				{/* <Sidebar /> */}
				<Layout className="site-layout">
					<DynamicHeader />
					<DynamicContent />
				</Layout>
			</Layout>
		</>
	);
}

export default App;
