import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [path, setPath] = useState(window.location.pathname);

  const navigate = (newPath: string) => {
    window.history.pushState({}, '', newPath); // 히스토리에 새 경로 추가
    setPath(newPath);
  };

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState); // 뒤로가기, 앞으로가기 처리
    return () => window.removeEventListener('popstate', onPopState); // cleanup
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, newPath: string) => {
    e.preventDefault();
    navigate(newPath);
  };

  let content;
  if (path === '/') {
    content = (
      <div>
        <h2>홈페이지</h2>
        <p>안녕하세요. React Router 없이 만든 웹입니다.</p>
      </div>
    );
  } else if (path.startsWith('/list')) {
    const currentPage = parseInt(path.split('/')[2] || '1', 10); //URL 경로를 '/'로 분할하여 페이지 번호를 추출
    const items = Array.from({ length: 10 }, (_, i) => `아이템 ${i + 1}`); // 10개의 아이템 생성
    const itemsPerPage = 1;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    content = (
      <div>
        <h2>리스트 페이지</h2>
        <ul>
          {currentItems.map(item => <li key={item}>{item}</li>)}
        </ul>
        <div className="pagination">
          <button onClick={() => navigate(`/list/${currentPage - 1}`)} disabled={currentPage <= 1}>이전</button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={() => navigate(`/list/${currentPage + 1}`)} disabled={currentPage >= totalPages}>다음</button>
        </div>
      </div>
    );
  } else {
    content = (
      <div>
        <h2>404 - 페이지를 찾을 수 없습니다</h2>
        <p>요청하신 페이지가 존재하지 않습니다.</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <nav>
          <a href="/" onClick={(e) => handleLinkClick(e, '/')}>홈</a>
          <a href="/list" onClick={(e) => handleLinkClick(e, '/list')}>리스트</a>
        </nav>
      </header>
      <main>{content}</main>
    </div>
  );
}

export default App;
