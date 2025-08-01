import { db } from '@/firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where
} from 'firebase/firestore';

export interface TodoItem {
  id?: string;
  text: string;
  uid: string; // user ID
}

// Thêm todo
export const addTodo = async (text: string, uid: string) => {
  const todoRef = collection(db, 'todos');
  return await addDoc(todoRef, { text, uid });
};

// Lấy danh sách todo theo user
export const getTodos = async (uid: string): Promise<TodoItem[]> => {
  const todoRef = collection(db, 'todos');
  const q = query(todoRef, where('uid', '==', uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as TodoItem[];
};

// Xóa todo
export const deleteTodo = async (id: string) => {
  await deleteDoc(doc(db, 'todos', id));
};
