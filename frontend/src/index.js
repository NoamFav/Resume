// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import your main App component
import './styles/tailwind.css'; // Import your Tailwind CSS

console.log('App is running!');

// Create the root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {}
  </React.StrictMode>
);
