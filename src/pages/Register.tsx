// src/components/Register.tsx
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Đăng ký thành công!');
    } catch (error: any) {
      alert('Lỗi: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Đăng ký</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
      <button onClick={handleRegister}>Đăng ký</button>
    </div>
  );
}

export default Register;
