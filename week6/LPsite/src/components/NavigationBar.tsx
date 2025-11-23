import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavigationBar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMyPageClick = () => {
    if (auth?.isLoggedIn) {
      navigate("/mypage");
    } else {
      alert("로그인 후 접근 가능합니다.");
      navigate("/signin");
    }
  };

  return (
    <nav className="flex items-center justify-between bg-gray-100 p-4 border-b">
      <Link to="/" className="text-xl font-bold text-gray-800">LP Site</Link>
      <ul className="flex items-center space-x-4">
        <li>
          <button onClick={handleMyPageClick} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">마이페이지</button>
        </li>
        {auth?.isLoggedIn ? (
          <li>
            <button onClick={auth.logout} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">로그아웃</button>
          </li>
        ) : (
          <li>
            <Link to="/signin" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">로그인</Link>
          </li>
        )}
        <li>
          <Link to="/signup" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">회원가입</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;