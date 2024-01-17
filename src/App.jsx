import { useState, useEffect } from 'react';
import 'boxicons/css/boxicons.min.css';
import './App.css'
import Layout from './layout/Layout'

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light');
  };


  return (
    <div className={theme}>
      <Layout theme={theme} />
      <div className="theme-toggle ">
        <button onClick={toggleTheme}>
          {theme === 'light' 
          ? <i className='bx bx-moon' ></i>
          : <i className='bx bx-sun' style={{color:"#f6fc07"}}  ></i>}
        </button>
    </div>
    </div>
  )
}

export default App;