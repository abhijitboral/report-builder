import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DynamicRouter from "./Routers/Router";
import { UserProvider } from "./components/contexts/UserContext";
import { AuthProvider } from "./components/contexts/AuthContext";
function App() {
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<UserProvider>
						<DynamicRouter />
					</UserProvider>
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
