const calculateWeightLostInAMonth = (
  cycling,
  running,
  swimming,
  extraCalorieInTake
) => {
  let weightLostInAMonth = 0;

  // write logic here
  if (cycling > 0 && running > 0 && swimming > 0 && extraCalorieInTake > 0) {
    const calorie = (cycling + running + swimming) * 2 * 4;
    const burnedCalories = calorie - extraCalorieInTake * 30;

    return (weightLostInAMonth = burnedCalories / 1000);
  }
  return -1;
};

module.exports = calculateWeightLostInAMonth;
