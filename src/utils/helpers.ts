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

export const calculate_age = dateString => {
  const ds = new Date(dateString);
  const diff_ms = Date.now() - ds.getTime();
  const age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
};
