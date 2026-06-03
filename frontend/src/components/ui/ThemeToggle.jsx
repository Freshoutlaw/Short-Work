// ThemeToggle.jsx
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2 items-center bg-white/10 backdrop-blur rounded-full p-1 border border-white/20">
      <button
        onClick={() => setTheme('dark')}
        className={`px-4 py-2 text-xs font-medium rounded-full transition ${
          theme === 'dark' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
        }`}
      >
        🌙 Dark
      </button>
      <button
        onClick={() => setTheme('light')}
        className={`px-4 py-2 text-xs font-medium rounded-full transition ${
          theme === 'light' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
        }`}
      >
        ☀️ Light
      </button>
    </div>
  );
};