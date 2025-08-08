import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from "@/services/todoService";
import type { TodoItem } from "@/services/todoService";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select, Space } from "antd";
import dayjs from "dayjs";

const priorities = [
  "urgent_important",
  "urgent_not_important",
  "not_urgent_important",
  "not_urgent_not_important",
];

const priorityLabels: Record<string, string> = {
  urgent_important: "📌 Quan trọng & Ưu tiên",
  urgent_not_important: "⚡ Ưu tiên nhưng không quan trọng",
  not_urgent_important: "📖 Quan trọng nhưng không ưu tiên",
  not_urgent_not_important: "🧘 Không quan trọng & Không ưu tiên",
};

function TodoList() {
  const { user, loading, isAuthenticated } = useAuth();
  const [todos, setTodos] = useState<Record<string, TodoItem[]>>({});
  const [text, setText] = useState("");
  const [priority, setPriority] = useState(priorities[0]);
  const [deadline, setDeadline] = useState("");
  const [isModalTodo, setIsModalTodo] = useState(false);
  const [form] = Form.useForm();
  const [subtasks, setSubtasks] = useState<string[]>([]);

  const handleRemoveSubtask = (index: number) => {
    const newSubtasks = [...subtasks];
    newSubtasks.splice(index, 1);
    setSubtasks(newSubtasks);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log("values", values);

      // const data = {
      //   ...values,
      //   createdAt: new Date(),
      //   subtasks,
      // };
      // onSubmit?.(data);
      setIsModalTodo(false);
      form.resetFields();
      setSubtasks([]);
    });
  };

  const loadTodos = async () => {
    if (!user) return;
    const list = await getTodos(user.uid);
    const grouped: Record<string, TodoItem[]> = {};
    priorities.forEach((p) => (grouped[p] = []));
    list.forEach((todo: any) => grouped[todo.priority]?.push(todo));
    setTodos(grouped);
  };

  useEffect(() => {
    loadTodos();
  }, [user]);

  if (loading)
    return <p className="text-center mt-4">Đang kiểm tra đăng nhập...</p>;
  if (!isAuthenticated)
    return (
      <p className="text-center mt-4">Vui lòng đăng nhập để dùng TodoList</p>
    );

  return (
    <div className="p-4">
      <Button onClick={() => setIsModalTodo(true)}>Tạo task</Button>
      <Modal
        title="Việc cần làm"
        open={isModalTodo}
        onCancel={() => setIsModalTodo(false)}
        onOk={handleOk}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            isDone: false,
            date: dayjs(),
          }}
        >
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input placeholder="Nhập tiêu đề" />
          </Form.Item>

          <Form.Item label="Nội dung" name="content">
            <Input.TextArea placeholder="Nhập nội dung công việc" rows={3} />
          </Form.Item>

          <Form.Item label="Estimate time (giờ)" name="estimate">
            <Input type="number" min={0} placeholder="Ví dụ: 2" />
          </Form.Item>

          <Form.Item
            label="Độ quan trọng"
            name="priority"
            rules={[{ required: true, message: "Vui lòng chọn độ quan trọng" }]}
          >
            <Select placeholder="Chọn mức độ quan trọng">
              <Select.Option value="low">Thấp</Select.Option>
              <Select.Option value="medium">Trung bình</Select.Option>
              <Select.Option value="high">Cao</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Ngày thực hiện" name="date">
            <DatePicker
              format="DD/MM/YYYY HH:mm"
              showTime={{ format: "HH:mm" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default TodoList;
