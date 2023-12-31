export function setDarkTheme() {

  localStorage.setItem("themeMode", "dark");
  document.documentElement.classList.add("dark");
  document.documentElement.classList.add("bg-slate-900");
  
}
export function setLightTheme() {
  localStorage.setItem("themeMode", "light");
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.remove("bg-slate-900");

}
