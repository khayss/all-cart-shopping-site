export const numberWithCommas = (x) => {
    if (isNaN(x)) {
      return x;
    }
    return parseFloat(x)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };