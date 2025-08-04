// src/components/Login.tsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const dataLogin = await signInWithEmailAndPassword(auth, email, password);
      console.log('dataLogin', dataLogin);
      alert('Đăng nhập thành công!');
    } catch (error: any) {
      alert('Lỗi: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
}

export default Login;
