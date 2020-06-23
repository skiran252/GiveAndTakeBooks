const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://saikiran:geetha123@cluster0-dfva2.mongodb.net/give-n-take?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
},(response)=>{
    console.log("MongoDB server is up and working")
})