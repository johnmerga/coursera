

//Create function addNumbers which will take two parameters add the numbers 
//and return the result
const addNumbers =(num1,num2)=>{
    return +num1 + +num2
}


//Create function subNumbers which will take two parameters subtract the numbers 
//and return the result

const subNumbers = (num1,num2)=>{
    return +num1 - +num2
}
//Create function mulNumbers which will take two parameters multiply the numbers 
//and return the result
const mulNumbers = (num1,num2)=>{
    return +num1 * +num2
}

//Create function divNumbers which will take two parameters divide the numbers 
//and return the result

const divNumbers = (num1,num2)=>{
    return num2 === 0 ? 'Please provide valid numbers..!' : +num1 / +num2
}


module.exports = {
  addNumbers,
  subNumbers,
  mulNumbers,
  divNumbers
}