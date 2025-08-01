import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/';
// import { increment, decrement } from '@/features/counter/counterSlice';
import { Link } from 'react-router-dom';

export default function Home() {
//   const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Home Page</h2>
      {/* <p>Count: {count}</p> */}
      {/* <button onClick={() => dispatch(increment())}>Tăng</button> */}
      {/* <button onClick={() => dispatch(decrement())}>Giảm</button> */}
      <br />
      <Link to="/about">Đi tới About</Link>
    </div>
  );
}
