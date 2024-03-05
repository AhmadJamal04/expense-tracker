export const moneyFormatter = (num) => {
  // Convert the string to a number
  const number = typeof num === "string" ? parseInt(num) : num;

  // Check if the number is valid
  if (isNaN(number)) {
    return "Invalid number";
  }
  let p = number.toFixed(2).split(".");
  return (
    "$ " +
    p[0]
      .split("")
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
      }, "") +
    "." +
    p[1]
  );
};
