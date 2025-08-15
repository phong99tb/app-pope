import { db } from '@/firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from 'firebase/firestore';

export interface TodoItem {
  id?: string;
  text: string;
  uid: string; // user ID
  priority: string,
  deadline: string
}

var nameDB = 'todos'

// Thêm todo
export const addTodo = async (todo: TodoItem) => {
  const todoRef = collection(db, nameDB);
  return await addDoc(todoRef, todo);
};

// Lấy danh sách todo theo user
export const getTodos = async (uid: string): Promise<TodoItem[]> => {
  const todoRef = collection(db, nameDB);
  const q = query(todoRef, where('uid', '==', uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as TodoItem[];
};

export const updateTodo = async (todo: TodoItem) => {
  if (!todo.id) return;
  const todoRef = doc(db, nameDB, todo.id);
  const { id, ...data } = todo;
  await updateDoc(todoRef, data);
};

// Xóa todo
export const deleteTodo = async (id: string) => {
  await deleteDoc(doc(db, nameDB, id));
};
