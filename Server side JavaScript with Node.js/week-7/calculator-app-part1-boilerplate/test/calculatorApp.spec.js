const chai = require('chai');
const expect = chai.expect;
const { addition, subtraction } = require('../src/calculatorApp');

describe('Addition Functionality', () => {
  
  it('Check for addition of two positive numbers and return the sum as positive number', () => {
    // Write Test Case Here
    expect(addition(3,5)).to.equal(8)
    expect(addition(4000,2000)).to.equal(6000)
  });

  it('Check for addition of two negative numbers and return the sum as negative number.', () => {
    // Write Test Case Here
    expect(addition(-3,-5)).to.equal(-8)
    expect(addition(-4353,-405905)).to.equal(-410258)


  });

  it('Check if either of number is negative produce subtracted output.', () => {
    // Write Test Case Here
    expect(addition(-3,5)).to.equal(2)
    expect(addition(13,-5)).to.equal(8)

    
  });


});

describe('Subtraction Functionality', () => {
  it('Check for subtracting two positive number and return positive subtraction', () => {
    // Write Test Case Here
    expect(subtraction(10,9)).to.equal(1)
    expect(subtraction(1053,4055)).to.equal(-3002)

  });
  it('Check if either of number is negative produce sum as output', () => {
    // Write Test Case Here
    expect(subtraction(10,-9)).to.equal(19)
    expect(subtraction(-10,9)).to.equal(-19)


  });
  it('Subtracting zero will produce zero as subtraction.', () => {
    // Write Test Case Here
    expect(subtraction(10,0)).to.equal(10)

  });
});
