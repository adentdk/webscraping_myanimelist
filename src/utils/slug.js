export const getSlug = (string = "") => {
  return string.replace(/ /gi, '-').toLowerCase();
}