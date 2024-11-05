import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {
  Auth,
  Landing,
  Dashboard,
  Link,
  Redirect
} from "@/pages"
import Layout from '@/layout/layout'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/link/:id',
        element: <Link />
      },
      {
        path: '/:id',
        element: <Redirect />
      },
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
