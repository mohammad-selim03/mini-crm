import { useTheme } from "../../context/ThemeContext";

const Signup = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <button onClick={toggleTheme} className="text-sm p-2">
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </div>
  );
};

export default Signup;
