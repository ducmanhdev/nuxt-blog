export const slugify = (str: string) => {
  // Regular expressions for slugify function.
  const ACCENTED_CHARS = /[\u0300-\u036F]/g;
  const NON_ALPHANUMERIC = /[^a-z0-9 -]/g;
  const SPACES = /\s+/g;
  const CONSECUTIVE_HYPHENS = /-+/g;
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(ACCENTED_CHARS, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(NON_ALPHANUMERIC, '') // remove non-alphanumeric characters
    .replace(SPACES, '-') // replace spaces with hyphens
    .replace(CONSECUTIVE_HYPHENS, '-'); // remove consecutive hyphens
};

export const handleScrollToEl = (querySelector: string) => {
  if (!window) return;

  const el = document.querySelector(querySelector) as HTMLElement;
  if (!el) return;

  const offset = document.getElementById('main-header')?.offsetHeight || 0;
  window.scrollTo({
    top: el.offsetTop - offset,
    behavior: 'smooth',
  });
};

export const objectToFormData = (obj: Record<any, any>) => {
  const formData = new FormData();
  Object.keys(obj).forEach((key) => formData.append(key, obj[key]));
  return formData;
};
