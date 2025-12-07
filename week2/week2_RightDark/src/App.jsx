import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen w-screen transition-colors duration-500 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      <div className={`p-8 rounded-lg shadow-lg text-center ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
        <h1 className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
        </h1>
        <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          Click the button to toggle the theme.
        </p>
        <button 
          onClick={toggleTheme} 
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-300"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
}

export default App;