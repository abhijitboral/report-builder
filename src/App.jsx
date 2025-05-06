import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DynamicRouter from "./Routers/Router";
import { UserProvider } from "./components/contexts/UserContext";
function App() {
	return (
		<>
			<BrowserRouter>
				<UserProvider>
					<DynamicRouter />
				</UserProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
