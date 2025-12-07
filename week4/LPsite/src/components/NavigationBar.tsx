import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-100 p-4 border-b">
      <Link to="/" className="text-xl font-bold text-gray-800">LP Site</Link>
      <ul className="flex items-center space-x-4">
        <li>
          <Link to="/signin" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">로그인</Link>
        </li>
        <li>
          <Link to="/signup" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">회원가입</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;