import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PopularPage from './pages/PopularPage';
import NowPlayingPage from './pages/NowPlayingPage';
import TopRatedPage from './pages/TopRatedPage';
import UpcomingPage from './pages/UpcomingPage';
import MovieDetailPage from './pages/MovieDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="popular" element={<PopularPage />} />
        <Route path="now-playing" element={<NowPlayingPage />} />
        <Route path="top-rated" element={<TopRatedPage />} />
        <Route path="upcoming" element={<UpcomingPage />} />
        <Route path="movie/:movieId" element={<MovieDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;