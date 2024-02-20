import { useState, useEffect } from 'react';
import './App.css'
import Layout from './layout/Layout'
import ScrollTop from './components/ScrollToTop';
import { BiMoon, BiSun } from "react-icons/bi";

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
          ? <BiMoon />
          : <BiSun style={{color:"#f6fc07"}} />}
        </button>
      </div>
      <ScrollTop />
    </div>
  )
}

export default App;