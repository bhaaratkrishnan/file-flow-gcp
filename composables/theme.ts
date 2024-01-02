export function setDarkTheme() {

  localStorage.setItem("themeMode", "dark");
  document.body.classList.add("dark");
  document.body.classList.add("bg-slate-900");
  
}
export function setLightTheme() {
  localStorage.setItem("themeMode", "light");
  document.body.classList.remove("dark");
  document.body.classList.remove("bg-slate-900");

}
