// Return the sum of the two numbers
const addNumbers = (number1, number2) => {
  try {
    // check the arguments are numbers
    if (isNaN(+number1) || isNaN(+number2)) {
      throw new Error("Arguments must be numbers");
    }
    return +number1 + +number2;
  } catch (error) {
    return error;
  }
};

// Return the difference of the two numbers
const subNumbers = (number1, number2) => {
  try {
    // check the arguments are numbers
    if (isNaN(+number1) || isNaN(+number2)) {
      throw new Error("Arguments must be numbers");
    }
    return +number1 - +number2;
  } catch (error) {
    return error;
  }
};

// Return the product of the two numbers
const mulNumbers = (number1, number2) => {
  try {
    // check the arguments are numbers
    if (isNaN(+number1) || isNaN(+number2)) {
      throw new Error("Arguments must be numbers");
    }
    return +number1 * +number2;
  } catch (error) {
    return error;
  }
};
// Return the quotient of the two numbers, check if the second number is zero, then throw an Error
const divNumbers = (number1, number2) => {
  try {
    // check the arguments are numbers
    if (isNaN(+number1) || isNaN(+number2)) {
      throw new Error("Arguments must be numbers");
    }
    if (+number2 === 0) {
      throw new Error("ERROR::Divide by zero error..!");
    }
    return +number1 / +number2;
  } catch (error) {
    throw error;
  }
};
addNumbers(1, 0);
// Return the mod of the two numbers, check if the second number is zero, then throw an Error
const moduloNumbers = (number1, number2) => {
  try {
    // check the arguments are numbers
    if (isNaN(+number1) || isNaN(+number2)) {
      throw new Error("Arguments must be numbers");
    }
    if (+number2 === 0) {
      throw new Error("ERROR::Invalid number..!");
    }
    return +number1 % +number2;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addNumbers,
  subNumbers,
  mulNumbers,
  divNumbers,
  moduloNumbers,
};
