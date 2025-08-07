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

export const addMoney = async (money: any) => {
  const moneyRef = collection(db, 'moneys');
  return await addDoc(moneyRef, money);
};

export const getMoneys = async (uid: string): Promise<any[]> => {
  const moneyRef = collection(db, 'moneys');
  const q = query(moneyRef, where('uid', '==', uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as any[];
};