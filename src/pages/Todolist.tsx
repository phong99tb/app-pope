import { useState, useEffect } from 'react';
import { auth } from '@/firebase';
import { addTodo, getTodos, deleteTodo } from '@/services/todoService';
import type { TodoItem } from '@/services/todoService';
import { onAuthStateChanged } from 'firebase/auth';
// import type { User } from 'firebase/auth';


function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [text, setText] = useState('');
//   const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<any>('');

//   const uid = user.uid;
//   const uid = auth.currentUser?.uid;
  if (!uid) return <p>Vui lòng đăng nhập để dùng TodoList</p>;

  const loadTodos = async () => {
    const list = await getTodos(uid);
    setTodos(list);
  };

  const handleAdd = async () => {
    if (!text.trim()) return;
    await addTodo(text, uid);
    setText('');
    await loadTodos();
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    await loadTodos();
  };

  useEffect(() => {
    loadTodos();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   setUser(currentUser);
      setUid(currentUser?.uid)
      console.log('currentUser', currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
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
