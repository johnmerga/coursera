var category = function category(key) {
  // Write the Logic here
  var categoryList = [
    {
      key: "EL",
      value: "Education Loan",
    },
    {
      key: "HL",
      value: "Home Loan",
    },
    {
      key: "VL",
      value: "Vehicle Loan",
    },
    {
      key: "PL",
      value: "Personal Loan",
    },
  ];

  var categoryValue = "";
  categoryList.forEach((element) => {
    if (element.key.toLowerCase() === key.toLowerCase()) {
      categoryValue = element.value;
    }
  });
  return categoryValue;
};

module.exports = {
  category: category,
};
