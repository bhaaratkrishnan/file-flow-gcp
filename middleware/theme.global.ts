export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    (localStorage.getItem("themeMode") ?? "light") === "light"
      ? setLightTheme()
      : setDarkTheme();
  }
});
