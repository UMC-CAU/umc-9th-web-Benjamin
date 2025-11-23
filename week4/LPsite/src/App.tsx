import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Signin from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';

function App() {
  return (
    <Router>
      <NavigationBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;