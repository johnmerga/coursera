const addition = (a, b) => {
  // Write the code here
  try {
    if (isNaN(+a) || isNaN(+b)) {
      throw new Error("Invalid input");
    }
    return +a + +b;
  } catch (error) {
    throw error;
  }
};

const subtraction = (a, b) => {
  // Write the code here
  try {
    if (isNaN(+a) || isNaN(+b)) {
      throw new Error("Invalid input");
    }
    return +a - +b;
  } catch (error) {
    throw error;
  }
};

const multiplication = (a, b) => {
  try {
    if (isNaN(+a) || isNaN(+b)) {
      throw new Error("Invalid input");
    }
    return +a * +b;
  } catch (error) {
    throw error;
  }
};

const division = (a, b) => {
  try {
    if (isNaN(+a) || isNaN(+b)) {
      throw new Error("Invalid input");
    }
    if (b === 0) {
      throw new Error("Division by zero");
    }
    return +a / +b;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
};
