import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CountriesProvider from './context/CountriesContext';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<CountriesProvider>
				<App />
			</CountriesProvider>
		</BrowserRouter>
  	</React.StrictMode>
);