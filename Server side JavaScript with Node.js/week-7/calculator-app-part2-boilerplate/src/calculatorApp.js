const addition = (num1, num2) => {
  // Write the code here
  
};

const subtraction = (num1, num2) => {
  // Write the code here
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
      throw new Error("Error:: Division by zero");
    }
    return +a / +b;
  } catch (error) {
    throw error;
  }
};

module.exports = { addition, subtraction, multiplication, division };
