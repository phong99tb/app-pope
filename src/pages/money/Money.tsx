import { db } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";
import { addListBank, getListBank } from "@/services/moneyService";
import { Button, Form, Input, message, Modal, Select } from "antd";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";

const Money = () => {
  const [input, setInput] = useState<any>("");
  const [isModalAddAccount, setIsModalAddAccount] = useState<boolean>(false);
  const { user, loading, isAuthenticated } = useAuth();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = () => {
    form.validateFields().then(async(values) => {
      if (!user) return;
      var dataApi = {
        ...values,
        uid: user.uid
      }
      try {
        await addListBank(dataApi);
        messageApi.success("Thêm tài khoản thành công!");
      } catch (error) {
        messageApi.error("Thêm tài khoản thất bại!");
      }
    });
  }

  const callApiGetListBank = async () => {
    if (!user) return;
    const list = await getListBank(user.uid);
    console.log('list', list);
  }

  useEffect(() => {
    callApiGetListBank()
  }, [user]);

  if (loading)
    return <p className="text-center mt-4">Đang kiểm tra đăng nhập...</p>;
  if (!isAuthenticated)
    return (
      <p className="text-center mt-4">Vui lòng đăng nhập để dùng TodoList</p>
    );

  return (
    <div>
      {contextHolder}
      <h2>Money Page</h2>
      <Input value={input} onChange={(e) => setInput(e.target.value)} />
      <Button onClick={()=>{setIsModalAddAccount(true)}}>Thêm tài khoản</Button>
      <Modal
        title="Thêm tài khoản"
        open={isModalAddAccount}
        onCancel={() => setIsModalAddAccount(false)}
        onOk={handleOk}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            nameBank: '',
            amount: 0
          }}
        >
          <Form.Item
            label="Tên tài khoản"
            name="nameBank"
            rules={[{ required: true, message: "Vui lòng nhập tên tài khoản" }]}
          >
            <Input placeholder="Nhập tài khoản..." />
          </Form.Item>

          <Form.Item
            label="Số tiền"
            name="amount"
            rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
          >
            <Input placeholder="Nhập số tiền..." />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default Money;
