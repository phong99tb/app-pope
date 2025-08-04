import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import TodoList from '@/pages/Todolist';
import MainLayout from '@/layouts/MainLayout';

const baseURL = import.meta.env.VITE_BASE_URL;

const router = createBrowserRouter([
  {
    path: baseURL,
    element: <MainLayout />, // 👈 Layout bọc các page bên trong
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'todolist', element: <TodoList /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
