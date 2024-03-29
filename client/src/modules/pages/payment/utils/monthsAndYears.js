export const months = [
  "--select month--",
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const year = new Date().getFullYear();

const empty = Array(6).fill(null);
export const years = empty.map((item, index) =>
  index === 0 ? "--select year--" : +year + +index
);
