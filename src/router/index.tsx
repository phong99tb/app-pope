import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import TodoList from '@/pages/todolist/Todolist';
import MainLayout from '@/layouts/MainLayout';
import NotFound from '@/pages/NotFound';
import Money from '@/pages/money/Money';
import Casino from '@/pages/casino/Casino';
import CasinoMatch from '@/pages/casino/CasinoMatch';

const baseURL = import.meta.env.VITE_BASE_URL;

const router = createBrowserRouter([
  {
    path: '',
    children: [
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: baseURL,
    element: <MainLayout />, // 👈 Layout bọc các page bên trong
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'todolist', element: <TodoList /> },
      { path: 'money', element: <Money /> },
      { path: 'casino', element: <Casino /> },
      { path: 'casino/:id', element: <CasinoMatch /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
