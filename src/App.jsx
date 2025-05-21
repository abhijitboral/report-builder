import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DynamicRouter from "./Routers/Router";
import { UserProvider } from "./components/contexts/UserContext";
import { AuthProvider } from "./components/contexts/AuthContext";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";
function App() {
	useAxiosInterceptor();
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
