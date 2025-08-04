import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div>
      <header style={{ padding: '10px' }}>
        <h1>📝 My App</h1>
      </header>

      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>

      <footer style={{ padding: '10px', marginTop: '40px' }}>
        <p>&copy; 2025 Thiên Khánh</p>
      </footer>
    </div>
  );
}
