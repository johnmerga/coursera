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

/* using aggregation */

/* Counting the number of each product in the array. */

// const productCounter = products.reduce((pre, currentPro) => {
//   let check = pre.find((element) => element[0] == currentPro[0]);

//   if (!check) {
//     pre.push([currentPro[0], 1]);
//   } else {
//     ++check[1]
//   }
//   return pre;
// }, []);
// console.table(productCounter);

let order = [
  {
    orderId: 1,
    orderDate: "2020-01-01",
    customer: 3239,
    products: "T-shirt",
    quantity: 2,
    price: 100,
  },
  {
    orderId: 2,
    orderDate: "2022-03-01",
    customer: 3439,
    products: "T-shirt",
    quantity: 4,
    price: 100,
  },
  {
    orderId: 2,
    orderDate: "2022-03-01",
    customer: 3439,
    products: "shoes",
    quantity: 18,
    price: 150,
  },
  {
    orderId: 2,
    orderDate: "2022-03-01",
    customer: 3439,
    products: "shoes",
    quantity: 20,
    price: 89,
  },
];



/////////////////////////////////////////////////////////////////////////////////
let totalOrder = order.reduce((prev, current) => {
  let check = prev.find((item) => item.product == current.products);
  if (!check) {
    prev.push({
      product: current.products,
      quantity: current.quantity,
      totalAmount: current.price,
      order: 1,
    });
  } else {
    ++check.order;
    check.totalAmount += current.price;
    check.quantity += current.quantity;
  }
  return prev;
}, []);

console.table(totalOrder);
