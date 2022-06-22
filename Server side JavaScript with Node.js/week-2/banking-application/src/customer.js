const { category } = require("./category");
var customerList = [];

const addCustomer = (
  CustomerId,
  CustomerName,
  CustomerAge,
  CustomerAddress,
  CustomerContactNumber,
  Category
) => {
  // Write the Logic here
  if (customerIndx(CustomerId) > -1) return;
  customerList.push([
    CustomerId,
    CustomerName,
    CustomerAge,
    CustomerAddress,
    CustomerContactNumber,
    Category,
  ]);
};

const updateCustomer = (
  CustomerId,
  CustomerName,
  CustomerAge,
  CustomerAddress,
  CustomerContactNumber,
  Category
) => {
  // Write the Logic here
  if (customerIndx(CustomerId) > -1) {
    customerList[customerIndx(CustomerId)] = [
      CustomerId,
      CustomerName,
      CustomerAge,
      CustomerAddress,
      CustomerContactNumber,
      Category,
    ];
  }
};

const getAllCustomers = () => {
  // Write the Logic here
  return customerList;
};

// check if the customer is present in the list and return the index
const customerIndx = (CustomerId) => {
  // Write the Logic here
  let index = customerList.findIndex((element) => {
    return element[0] === CustomerId;
  });
  return index;
};


module.exports = { addCustomer, updateCustomer, getAllCustomers };
