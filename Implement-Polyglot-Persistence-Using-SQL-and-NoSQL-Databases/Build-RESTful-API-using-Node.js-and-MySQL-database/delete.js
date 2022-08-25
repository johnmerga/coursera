const body = {
  name: "Product 1",
  description: "This is product 1",
  price: 100,
};

const requiredFields = ["name", "description", "price"];

const checkFieldValidation = (body, requiredFields) => {
  const newEntries = Object.keys(body);
  const isValid =
    requiredFields.every((keys) => newEntries.includes(keys)) &&
    newEntries.every((keys) => requiredFields.includes(keys));
  return isValid;
};

console.log(checkFieldValidation(body, requiredFields));
