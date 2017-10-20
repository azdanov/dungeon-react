// @flow
function getWidth() {
  if (document.body && document.documentElement) {
    return Math.max(
      document.body.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.scrollWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth,
    );
  }
  return null;
}

function getHeight() {
  if (document.body && document.documentElement) {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight,
    );
  }
  return null;
}

function getMaxSize() {
  const width = getWidth();
  const height = getHeight();
  if (width && height) {
    return Math.min(width, height);
  }
  return null;
}

export { getWidth, getHeight };
export default getMaxSize();
