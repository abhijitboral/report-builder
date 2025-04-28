import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DynamicHeader from "./components/DynamicHeader";
import DynamicContent from "./components/DynamicContent";
import DynamcLogin from "./components/DynamicLoging";
import DynamcSignup from "./components/DynamicSignup";
import DynamicLayout from "./components/DynamicLayout";
import DynamicRouter from "./Routers/Router";
function App() {
	return (
		<>
			{/* <DynamcLogin />
			<DynamcSignup /> */}
			<BrowserRouter>
				<DynamicRouter />
			</BrowserRouter>
		</>
	);
}

export default App;
