const pi = 3.14;

const calculateArea = (choice, side, length, breadth, radius) => {
  let area = 0.0;
  // write logic here
  // note that you check the values passed are not null before performing any operation on them
  if (side || length || breadth || radius) {
    switch (choice) {
      case "square":
        area = side * 4;
        break;
      case "rectangle":
        area = length * breadth;
        break;
      case "circle":
        area = pi * radius * radius;
        break;
      case "triangle":
        area = (length * breadth) / 2;
        break;

      default:
        area = 0.0;
        break;
    }

    return area;
  } else {
    return -1;
  }
};

module.exports = { calculateArea };
