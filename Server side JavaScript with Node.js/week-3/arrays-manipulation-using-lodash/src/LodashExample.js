
//import the lodash module
const _ = require('lodash')


//Create a function to find a maximum value from number array.
const findMaxValue = (arr)=>{
    return _.max(arr)
}

//Create a function to return all values from numbers array 
//which are greater than the second parameter.​
const filterValues = (arr,input)=>{
    return _.filter(arr, (n)=>n > input)
}

//Create a function to return all values of employeeName array in capital letters.

const nameInCapital = (arr)=>{
    return _.map(arr, (n)=>n.toUpperCase())
}


module.exports = {
  findMaxValue,
  filterValues,
  nameInCapital,
  
}
