import { useState, useEffect } from 'react';
import './App.css';

// MoviePage component
function MoviePage() {
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            accept: 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.results); 
        setMovies(data.results);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, [apiKey]);

  return (
    <div>
      <h2>인기 영화</h2>
      <ul className="movie-grid">
        {movies.map((movie: any) => (
          <li key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
  } else if (path === '/movies') {
    content = <MoviePage />;
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
          <a href="/movies" onClick={(e) => handleLinkClick(e, '/movies')}>인기 영화 리스트</a>
        </nav>
      </header>
      <main>{content}</main>
    </div>
  );
}

export default App;
