import { createBrowserRouter } from 'react-router-dom'
import Dashboard from 'pages/dashboard'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Dashboard />
      </>
    ),
  },
])
