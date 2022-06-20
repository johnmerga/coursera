const swapDigits = (number) => {
  let swappedNumber = 0;
  //write logic here
  let digits = countDigits(number);
  if (digits) {
    if (digits % 2 === 0) {
      swappedNumber = changePosition(number.toString().split(""));
    } else {
      swappedNumber = changePosition(number.toString().split(""), true);
    }
    return swappedNumber;
  }
  return 0;
};


/**
 * It counts the number of digits in a number
 * @param number - The number to count the digits of.
 * @returns the number of digits in the number.
 */
const countDigits = (number) => {
  let count = 0;

  while (number > 0) {
    number = Math.floor(number / 10);
    count++;
  }

  for (let i = 0; i < count; i++) {}

  return count;
};

/**
 * If the number of digits is even, swap the first and second digit, then the third and fourth digit,
 * and so on. If the number of digits is odd, swap the second and third digit, then the fourth and
 * fifth digit, and so on
 * @param arr - an array of numbers
 * @param isOdd - a boolean value that determines whether the number is odd or even.
 * @returns the sum of the two numbers.
 */
const changePosition = (arr, isOdd) => {
  if (!isOdd) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (i % 2 === 0) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  } else {
    for (let i = 0; i < arr.length - 1; i++) {
      if (i % 2 !== 0 && i > 0) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }

  return +arr.join("");
};

console.log(swapDigits(123455667788));
module.exports = swapDigits;
