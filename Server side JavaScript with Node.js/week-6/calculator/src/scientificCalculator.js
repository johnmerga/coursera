// Return the ceil value of the number, check if the number is < or = zero, then throw an Error
const computeCeil = (number) => {
  try {
    // check the arguments are numbers
    if (isNaN(+number)) {
      throw new Error("Arguments must be numbers");
    }
    if (+number <= 0) {
      throw new Error("ERROR::Number is less than or equal to zero..!");
    }
    return Math.ceil(+number);
  } catch (error) {
    throw error;
  }
};

// Return the floor value of the number, check if the number is < or = zero, then throw an Error
const computeFloor = (number) => {
  try {
    // check the arguments are numbers
    if (isNaN(+number)) {
      throw new Error("Arguments must be numbers");
    }
    if (+number <= 0) {
      throw new Error("ERROR::Number is less than or equal to zero..!");
    }
    return Math.floor(+number);
  } catch (error) {
    throw error;
  }
};
// Return the square root of the number, check if the number is < or = zero, then throw an Error
const computeSquareRoot = (number) => {
  try {
    // check the arguments are numbers
    if (isNaN(+number)) {
      throw new Error("Arguments must be numbers");
    }
    if (+number <= 0) {
      throw new Error("ERROR::Number is less than or equal to zero..!");
    }
    return Math.sqrt(+number);
  } catch (error) {
    throw error;
  }
};
// Return the exponent value of the number, check if the number is < or = zero, then throw an Error
const computePower = (number, powerOf) => {
  try {
    // check the arguments are numbers
    if (isNaN(+number) || isNaN(+powerOf)) {
      throw new Error("Arguments must be numbers");
    }
    if (+number <= 0 || +powerOf <= 0) {
      throw new Error("ERROR::Number or power is less than or equal to zero");
    }
    return Math.pow(+number, +powerOf);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  computeCeil,
  computeFloor,
  computeSquareRoot,
  computePower,
};
