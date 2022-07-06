const fs = require('fs')
const path = require('path')

const fileName = path.join(__dirname, '.','demo.txt')


/* Creating a readable stream from the fileName variable. */
const readableStream = fs.createReadStream(fileName, 'utf-8')

/* Listening for the data event. */
readableStream.on('data', (data)=>{
    console.log(data)
})

readableStream.on('end',()=>{
    console.log('\nend of file')
})




