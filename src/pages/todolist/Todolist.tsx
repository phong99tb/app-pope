import { useState, useEffect } from 'react';
import { addTodo, getTodos, deleteTodo } from '@/services/todoService';
import type { TodoItem } from '@/services/todoService';
import { useAuth } from '@/hooks/useAuth';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

function TodoList() {
  const { user, loading, isAuthenticated } = useAuth();
  const { isListening, transcript, startListening, stopListening } = useSpeechRecognition();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!user) return;

    const loadTodos = async () => {
      const list = await getTodos(user.uid);
      setTodos(list);
    };

    loadTodos();
  }, [user]);

  const handleAdd = async () => {
    if (!text.trim() || !user) return;
    await addTodo(text, user.uid);
    setText('');
    const list = await getTodos(user.uid);
    setTodos(list);
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    await deleteTodo(id);
    const list = await getTodos(user.uid);
    setTodos(list);
  };

  if (loading) return <p>Đang kiểm tra đăng nhập...</p>;
  if (!isAuthenticated) return <p>Vui lòng đăng nhập để dùng TodoList</p>;

  return (
    <div>
      <h2>Todo List</h2>
      <div>
      <h2>Nhận diện giọng nói</h2>
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? 'Dừng lại' : 'Bắt đầu nói'}
      </button>
      <p>Kết quả: {transcript}</p>
    </div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Nhập công việc..." />
      <button onClick={handleAdd}>Thêm</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text} <button onClick={() => handleDelete(todo.id!)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
