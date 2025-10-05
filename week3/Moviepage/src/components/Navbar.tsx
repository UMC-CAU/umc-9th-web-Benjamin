import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const activeStyle = {
    color: 'yellow',
  };

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50">
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            홈
          </NavLink>
        </li>
        <li>
          <NavLink to="/popular" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            인기 영화
          </NavLink>
        </li>
        <li>
          <NavLink to="/now-playing" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            상영 중
          </NavLink>
        </li>
        <li>
          <NavLink to="/top-rated" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            평점 높은
          </NavLink>
        </li>
        <li>
          <NavLink to="/upcoming" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            개봉 예정
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
