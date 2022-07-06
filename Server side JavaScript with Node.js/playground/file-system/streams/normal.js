
const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')
const path = require('path')

const demoTxt = path.join(__dirname,'.', 'demo.txt')

const myData = new Promise((resolve,rejects)=>{
        fs.readFile(demoTxt, 'utf-8',(err,data)=>{
            if(err)
                return rejects(err)
            return resolve(data)
        })
    })


myData.then(d => console.log(d)).catch(e=> console.log({myCustomError: e}))
