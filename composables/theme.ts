export function setDarkTheme() {
  localStorage.setItem("themeMode", "dark");
  document.documentElement.classList.add("dark");
}
export function setLightTheme() {
  localStorage.setItem("themeMode", "light");
  document.documentElement.classList.remove("dark");
}
