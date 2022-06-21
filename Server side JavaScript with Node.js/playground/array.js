/**
 * 
 * easy array manipulation
 * 
 * 
 const myArray = [
   ["T-shirt", 10],
   ["shorts", 32],
   ["pants", 35],
 ];
 const updateDiscount = (arr, discountP) => {
   for (let i = 0; i < arr.length; i++) {
     arr[i][1] = arr[i][1] - (arr[i][1] * discountP) / 100;
   }
   console.table(arr);
 };
 
 const calculateDiscount = (arr, discountP) => {
   // map with a new array
   const newArray = arr.map((item) => {
     return [item[0], item[1] - (item[1] * discountP) / 100];
   });
   return newArray;
 };
 */

/**
 * complex array manipulation
 */

//  an array of products a price between 100 600 for six products
const products = [
  ["T-shirt", 100],
  ["T-shirt", 170],
  ["socks", 600],
  ["socks", 130],
  ["socks", 340],
  ["shorts", 200],
  ["pants", 300],
  ["pants", 300],
  ["shoes", 400],
  ["shoes", 320],
  ["jacket", 500],
];

// Premium Products
const premiumProducts = (arr) => {
  return arr.filter((item) => item[1] >= 300);
};

// Discounted Products
const discountForNonPremium = (arr, percent) => {
  const newArray = arr.map((item) => {
    if (item[1] > 200)
      return [item[0], item[1] - (item[1] * percent) / 100, `🔽`];

    return [item[0], item[1], `🔵`];
  });
  return newArray;
};

console.table(premiumProducts(products));
console.table(products);
console.table(discountForNonPremium(products, 50));
