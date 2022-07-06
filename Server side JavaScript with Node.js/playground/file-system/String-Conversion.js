const fs = require("fs");
const path = require("path");
const readline = require("readline");


const outputDir = path.join(__dirname, ".", "output.txt");
const demoFileDir = path.join(__dirname, ".", "demo.txt");

const writableStream = fs.createWriteStream(outputDir, 'utf-8')
const demo = fs.createReadStream(demoFileDir, 'utf-8')

const file =readline.createInterface({
    input:demo
})

const wordsInArray = []

file.on('line',(line)=>{
const data = line.split(' ')
data.forEach(words =>{
    let word = words.substring(0,1).toUpperCase().concat(words.substring(1).toLowerCase())
    wordsInArray.push(word)
})


writableStream.write(wordsInArray.join(' ')+'\n')
})


/**
 Joe waited for the train. "Joe" = subject, "waited" = verb.
The train was late
Mary and Samantha took the bus
I looked for Mary and Samantha at the bus station
 */