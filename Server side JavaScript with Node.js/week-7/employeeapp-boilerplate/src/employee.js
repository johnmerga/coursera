const employeeList = [
  {
    id: "1",
    employeeName: "nameofemp",
    employeeSalary: 50000,
    employeeAge: 42,
    dateOfJoining: "2006-06-30T00:00:00.000Z",
    profileImage: "image_url",
  },
  {
    id: "2",
    employeeName: "nameofemp2",
    employeeSalary: 35000,
    employeeAge: 52,
    dateOfJoining: "2003-09-15T00:00:00.000Z",
    profileImage: "image_url",
  },
  {
    id: "3",
    employeeName: "nameofemp3",
    employeeSalary: 60000,
    employeeAge: 58,
    dateOfJoining: "2004-11-06T00:00:00.000Z",
    profileImage: "image_url",
  },
  {
    id: "4",
    employeeName: "nameofemp4",
    employeeSalary: 5000,
    employeeAge: 50,
    dateOfJoining: "2005-03-17T00:00:00.000Z",
    profileImage: "image_url",
  },
  {
    id: "5",
    employeeName: "nameofemp5",
    employeeSalary: 50000,
    employeeAge: 36,
    dateOfJoining: "2010-07-07T00:00:00.000Z",
    profileImage: "image_url",
  },
];

const getEmployeeOverFifty = (employeeData) =>
  new Promise((resolve, reject) => {
    // Write the code here
    if (!employeeData) {
      return reject("Invalid Input");
    } else if (employeeData.length == 0) {
      return reject("Empty Array");
    }
    const overFifty = employeeData.filter((e) => e.employeeAge > 50).length
    if (!overFifty || overFifty.length == 0) {
      return reject("Empty Array");
    }
    resolve(overFifty);
  });

const getTotalNoOfDaysSinceJoining = (employeeData) =>
  new Promise((resolve, reject) => {
    // Write the code here
    if (!employeeData || employeeData.length == 0) {
      return reject("Empty Array");
    }
    const dateList = employeeData.map((e) => {
      const date = new Date(e.dateOfJoining);
      const today = new Date();
      const diff = today.getTime() - date.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      return days;
    });
    if (!dateList || dateList.length == 0) {
      return reject("Empty Array");
    }
    return resolve(dateList);
  });

// getTotalNoOfDaysSinceJoining(employeeList).then(res => console.log(res));
module.exports = { getEmployeeOverFifty, getTotalNoOfDaysSinceJoining };
