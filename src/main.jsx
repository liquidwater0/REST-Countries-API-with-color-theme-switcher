import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import CountriesProvider from './context/CountriesContext';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<HashRouter>
			<CountriesProvider>
				<App />
			</CountriesProvider>
		</HashRouter>
  	</React.StrictMode>
);