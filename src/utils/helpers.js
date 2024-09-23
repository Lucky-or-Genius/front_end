export const formatNumber = (num) => {
  if (num == null) {
    return "0";
  }

  const absNum = Math.abs(num);
  if (absNum >= 1000000000) {
    return Math.round(num / 1000000000) + "B";
  } else if (absNum >= 1000000) {
    return Math.round(num / 1000000) + "M";
  } else if (absNum >= 1000) {
    return Math.round(num / 1000) + "K";
  } else {
    return Math.round(num).toString();
  }
};
