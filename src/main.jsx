import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import theme from "../theme.js";
import Home from "./Pages/Home.jsx";
import Movies from "./Pages/Movies/Movies.jsx";
import Shows from "./Pages/Shows/Shows.jsx";
import Search from "./Pages/Search/Search.jsx";
import DetailsPage from "./Pages/DetailsPage.jsx";
import { AuthProvider } from "./context/authProvider.jsx";
import Watchlist from "./Pages/Watchlist.jsx";
import Protected from "./Components/routes/Protected.jsx";
import  WatchAgain  from "./Pages/WatchAgain.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/shows",
        element: <Shows />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/:type/:id",
        element: <DetailsPage />,
      },
      {
        path: "/watchlist",
        element: (
          <Protected>
            <Watchlist />
          </Protected>
        ),
      },
      {
        path: "/watchagain",
        element: (
          <Protected>
            <WatchAgain />
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);