import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DynamicRouter from "./Routers/Router";
function App() {
	return (
		<>
			<BrowserRouter>
				<DynamicRouter />
			</BrowserRouter>
		</>
	);
}

export default App;
