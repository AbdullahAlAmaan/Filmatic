import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import App from './App.jsx'
import './index.css'
import theme from '../theme.js'
import Movies from './Pages/Movies/Movies.jsx'
import Shows from './Pages/Shows/Shows.jsx'
import Home from './Pages/Home.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/movies',
        element: <Movies />,
      },
      {
        path: '/shows',
        element: <Shows />,
      },
      {
        path: '/search',
        element: <Search />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
)
