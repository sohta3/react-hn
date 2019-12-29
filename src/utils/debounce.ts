export const debounce = (func, wait, immediate = false, args = {}) => {
  let timeout;

  return () => {
    const callNow = immediate && !timeout;
    const later = () => {
      timeout = null;
      if (!immediate) {
        func(args);
      }
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func(args);
    }
  };
};
