export const convertToMask = (value: string): number | (RegExp | string)[] => {
  const defaultMask = 0;

  const mask = value
    ? value.split('').map(data => {
        switch (data) {
          case '0':
            return /\d/;
          case ' ':
            return data;
          default:
            return data;
        }
      })
    : defaultMask;

  return mask;
};
