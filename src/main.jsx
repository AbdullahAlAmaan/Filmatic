import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import App from './App.jsx';
import './index.css';
import theme from '../theme.js';  // Ensure the path is correctly pointing to your theme.js file

import Movies from './Pages/Movies/Movies.jsx';
import Shows from './Pages/Shows/Shows.jsx';
import Home from './Pages/Home.jsx';
import Search from './Pages/Search/Search.jsx';
import DetailsPage from './Pages/DetailsPage.jsx';
import { AuthProvider } from './context/authProvider.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/home', element: <Home /> },
      { path: '/movies', element: <Movies /> },
      { path: '/shows', element: <Shows /> },
      { path: '/search', element: <Search /> },
      { path: '/:type/:id', element: <DetailsPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);





