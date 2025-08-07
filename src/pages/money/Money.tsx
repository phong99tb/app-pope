import { useAuth } from "@/hooks/useAuth";
import { addMoney, getMoneys } from "@/services/moneyService";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";

const Money = () => {
  const [input, setInput] = useState<any>('')
  const { user, loading, isAuthenticated } = useAuth();

  const addMoneys = async () => {
    if (!user) return;
    console.log('add money', input);
    var getMoney = [
      { name: 'MB bank', age: 18 },
      { name: 'Agrybank', age: 12 },
      { name: 'LP bank', age: 11 },
    ]
    var getArray = [
      { name: 'Nam', age: 18 },
      { name: 'Chi', age: 12 },
      { name: 'Bong', age: 11 },
    ]
    const money = {
      uid: user.uid,
      array: getArray,
      money: getMoney,
    }
    await addMoney(money)
  }

  const loadTodos = async () => {
    if (!user) return;
    const list = await getMoneys(user.uid);
    console.log('list', list);
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
    <div>
      <h2>Money Page</h2>
      <Input value={input} onChange={(e) => setInput(e.target.value)} />
      <Button onClick={addMoneys}>Theem money</Button>
    </div>
  );
};

export default Money;
