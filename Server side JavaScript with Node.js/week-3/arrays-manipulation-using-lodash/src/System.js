
//import OS module
const OS = require('os')
//Create a function to get the name of the operating system of host machine.​
const getOSName =()=>{
    return OS.platform()
}
//Create a function to get returns the number of free memory of the system in bytes.​
const getFreeMemory = ()=>{
    return OS.freemem()
}
//Create a function to get the information about current user of the system.​
const getCurrentUser = ()=>{
    return OS.userInfo()
}
//Create a function to get the information of the hostname.
const getHostName = ()=>{
    return OS.hostname()
}
//Create a function to get the information about the CPU.
const getCPUDetails = ()=>{
    return OS.cpus()
}


module.exports = {
  getOSName,
  getFreeMemory,
  getCurrentUser,
  getHostName,
  getCPUDetails
}