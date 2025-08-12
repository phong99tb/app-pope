// src/components/Login.tsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import bgImg from "@/assets/img/background.jpg";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: any) => {
    const { email, password } = values;
    setLoading(true);
    try {
      const dataLogin = await signInWithEmailAndPassword(auth, email, password);
      console.log("Đăng nhập thành công:", dataLogin.user);
      navigate(`/app-pope/todolist`);
    } catch (error: any) {
      console.error("Lỗi đăng nhập:", error.code, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="bg-[rgba(255,255,255,0.8)] w-11/12 md:w-[500px] p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Đăng nhập</h2>
        <Form
          layout="vertical"
          onFinish={handleLogin}
          initialValues={{ email: "", password: "" }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email" size="large" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="mt-4"
              size="large"
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item>
            <p>Bạn chưa có tài khoản? <a href="/app-pope/register">Đăng ký ngay</a></p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
