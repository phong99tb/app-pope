
import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <div>
      <h2 className='text-white'>Home Page</h2>
      <br />
      <Link to="/about">Đi tới About</Link>
    </div>
  );
}
