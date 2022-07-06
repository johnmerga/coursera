const fs = require('fs')
const path = require('path')

const fileName = path.join(__dirname, '.','demo.txt')

const readableStream = fs.createReadStream(fileName)

let data = ''
let chunk
readableStream.on('readable', ()=>{
    while((chunk =readableStream.read()) != null){
        data += chunk
    }
    
    
})
readableStream.on('end',()=>{
    console.log( data)
    console.log('\nend of file')
})


// let data = ''
// let chunk;
// const myfile = new Promise((resolve,rejects)=>{
//     return readableStream.on('readable', ()=>{
//         while((chunk= readableStream.read()) != null){
//             data += chunk
//         }
//         resolve(data)
//     } )
// })
// myfile.then(d => console.log(d)).catch(e => console.log(e))
