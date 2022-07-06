const _ = require("lodash");

// create 10 object with product and  with  a mixed price
const products = _.times(10, () => {
  return {
    product: "product",
    price: _.random(1, 100),
  };
});
console.log(products);
const sortedProducts = _.sortBy(products, "price");
console.log(sortedProducts);
