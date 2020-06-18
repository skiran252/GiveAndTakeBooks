const express   = require('express')
const path      = require('path');
const hbs       = require('hbs')

const port = process.env.PORT || 3000
const app = express()
//converts response to json or else its made invalid
app.use(express.json())
//public path
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

app.set('view engine',hbs)
const viewspath = path.join(__dirname, '../templates/views')

app.set('views',viewspath)
const partialspath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialspath)

app.get('/',(req,res)=>{

})


app.listen(port, () => {
    console.log('server is up and running on',port)
})