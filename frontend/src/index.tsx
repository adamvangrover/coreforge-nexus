import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Includes Tailwind CSS
import App from './App';
import { AppProvider } from './contexts/AppContext';
// import reportWebVitals from './reportWebVitals'; // Optional: for performance monitoring

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Failed to find the root element. Please ensure your public/index.html has an element with id 'root'.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
