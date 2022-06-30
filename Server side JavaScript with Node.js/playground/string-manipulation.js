// string manipulation

let str = "hello you! it's been thisIsLarge a long time since we've met";
let vowels = ["a", "e", "i", "o", "u"];

const strMani = (str) => {
  return str.split("").length;
};
// console.log(strMani(str));

const countVowel = (str) => {
  let count = 0;
  str.split("").forEach(() => {
    if (vowels.includes()) count++;
  });
  return count;
};
// console.log(countVowel(str))

const isExist = (str, given) => {
  return str.split(" ").includes(given);
};
// console.log(isExist(str,'hello'))

const replaceWord = (str, old, rep) => {
  const index = str
    .split(" ")
    .findIndex((e) => e.toLowerCase() == old.toLowerCase());
  str = str.split(" ");
  str.splice(index, 1, rep);
  return str.join(" ");
};

// console.log(replaceWord(str,'john','yo'));
const titleCase = (str) => {
    return str
      .split(" ")
      .map((e) => {
        return e[0].toUpperCase() + e.slice(1);
      })
      .join(" ");
  };
  // console.log(titleCase(str));

const largestWord = (str) => {
  str = str.split(" ");
  str.sort((a, b) => {
    if (a.length > b) return 1;
    else if (a.length < b.length) return -1;
    else return 0;
  });
  const indx = str.length;
  return str[indx - 1];
};
// sort the array by length
console.log(largestWord(str));



