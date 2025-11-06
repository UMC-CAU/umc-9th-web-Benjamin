import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import SignIn from './pages/Signin';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import ProtectedRoute from './components/ProtectedRoute';
import GoogleRedirectHandler from './pages/GoogleRedirectHandler';
import './App.css';

function App() {
  return (
    <Router>
      <NavigationBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/v1/auth/google/callback" element={<GoogleRedirectHandler />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;