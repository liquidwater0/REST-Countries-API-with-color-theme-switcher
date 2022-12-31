import React, { useEffect, Suspense } from "react";
import "./scss/App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { DarkMode } from "@mui/icons-material";
import { useLocalStorage } from "./hooks/useLocalStorage";

const Home = React.lazy(() => import("./pages/Home"));
const CountryDetails = React.lazy(() => import("./pages/CountryDetails"));

function App() {
	const [theme, setTheme] = useLocalStorage("countries_api_theme", "dark");

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	function toggleTheme() {
		setTheme(prev => prev === "dark" ? "light" : "dark");
	}

	return (
    	<>
      		<header className="header shadow">
				<div className="container">
					<div className="title">Where in the world?</div>
					<button 
						onClick={toggleTheme}
						className="button theme-toggle-button"
					>
						<DarkMode/>
						Dark Mode
					</button>
				</div>
			</header>

			<main className="main">
				<Routes>
					<Route path="/" element={
						<Suspense fallback={ <h1>Loading...</h1> }>
							<Home/>
						</Suspense>
					}/>
					<Route path="/country/:id" element={
						<Suspense fallback={ <h1>Loading...</h1> }>
							<CountryDetails/>
						</Suspense>
					}/>
					<Route path="*" element={ <Navigate to="/"/> }/>
				</Routes>
			</main>
    	</>
  	);
}

export default App;