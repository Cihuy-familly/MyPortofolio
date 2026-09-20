"use client";

const STORAGE_KEY = "dawwi-portfolio-theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export default function ThemeToggle() {
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
    >
      <span>Theme</span>
    </button>
  );
}
