import { NavLink } from 'react-router-dom';

export default function Navbar() {
  // NavLink에 적용할 공통 스타일과 상태별 스타일을 미리 정의하면 더 깔끔합니다.

  function Navigation() {
    // 활성화됐을 때와 비활성화됐을 때의 스타일을 함수로 처리
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
      // 공통 스타일: 패딩, 둥근 모서리, 글자 크기 등
      const commonClasses = 'px-3 py-2 rounded-md text-sm font-medium';
      
      // 활성화 상태일 때 추가할 스타일
      const activeClasses = 'bg-gray-900 text-white';
      
      // 비활성화 상태일 때 추가할 스타일 (+마우스 호버 효과)
      const inactiveClasses = 'text-gray-300 hover:bg-gray-700 hover:text-white';

      // isActive 값에 따라 클래스를 조합하여 반환
      return `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`;
    };

    return (
      <nav className="bg-gray-800 p-4 sticky top-0 z-50">
        {/* ul 태그의 간격을 조금 더 늘려줍니다. (예: space-x-6) */}
        <ul className="flex space-x-6">
          <li>
            <NavLink to="/" className={getNavLinkClass}>
              홈
            </NavLink>
          </li>
          <li>
            <NavLink to="/popular" className={getNavLinkClass}>
              인기 영화
            </NavLink>
          </li>
          <li>
            <NavLink to="/now-playing" className={getNavLinkClass}>
              상영 중
            </NavLink>
          </li>
          <li>
            <NavLink to="/top-rated" className={getNavLinkClass}>
              평점 높은
            </NavLink>
          </li>
          <li>
            <NavLink to="/upcoming" className={getNavLinkClass}>
              개봉 예정
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
  return <Navigation />;
}