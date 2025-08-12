// src/components/Register.tsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import bgImg from "@/assets/img/background.jpg";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values: any) => {
    const { email, password } = values;
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      message.success("Đăng ký thành công!");
      navigate("/app-pope/login");
    } catch (error: any) {
      message.error(error.message || "Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="bg-[rgba(255,255,255,0.8)] w-11/12 md:w-[500px] p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Đăng ký
        </h2>

        <Form
          layout="vertical"
          onFinish={handleRegister}
          initialValues={{ email: "", password: "", confirmPassword: "" }}
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
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải ít nhất 6 ký tự!" },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Nhập mật khẩu" size="large" />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" size="large" />
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
              Đăng ký
            </Button>
          </Form.Item>

          <Form.Item>
            <p>
              Bạn đã có tài khoản?{" "}
              <a href="/app-pope/login" className="text-blue-600">
                Đăng nhập ngay
              </a>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
