const express   = require('express')
const path      = require('path');
const hbs       = require('hbs')

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())

const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

app.get('/',(req,res)=>{

})


app.listen(port, () => {
    console.log('server is up and running on',port)
})