export const pause = (ms: number) => (
  new Promise(resolve => setTimeout(resolve, ms))
);

export const getDateString = () => (
  new Date().toString().replace(/ GMT.*$/, '')
);
