export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  if (url.pathname.startsWith('/api/')) {
    console.log(url.pathname);
  }
});
