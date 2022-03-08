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

export const calculateAge = (dateString: string): number => {
  const ds = new Date(dateString);
  const diffMs = Date.now() - ds.getTime();
  const ageDt = new Date(diffMs);

  return Math.abs(ageDt.getUTCFullYear() - 1970);
};

export const upperCamelCase = (s: string): string => {
  return s.toLowerCase().replace(/(^|\s)([A-zÀ-ú])/g, a => {
    return a.toUpperCase();
  });
};
