// useTheme.js
import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return 'dark'; // Default to dark
  });

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // Remove both classes first
    html.classList.remove('dark', 'light');
    body.classList.remove('dark', 'light');
    
    if (theme === 'dark') {
      html.classList.add('dark');
      body.classList.add('dark', 'bg-black', 'text-white');
      html.style.backgroundColor = '#000000';
      body.style.backgroundColor = '#000000';
      body.style.color = '#ffffff';
    } else if (theme === 'light') {
      html.classList.add('light');
      body.classList.add('light', 'bg-white', 'text-black');
      html.style.backgroundColor = '#ffffff';
      body.style.backgroundColor = '#ffffff';
      body.style.color = '#000000';
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
};