const express = require('express')
const port = process.env.PORT || 8080
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const User = require('./models/user')
console.clear()

mongoose.connect('mongodb+srv://patrick123:johnpatrick@cluster0.udls2.mongodb.net/deploy_test?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    
})
//CONNECTING TO DATABASE
const db = mongoose.connection
db.on("error",console.error.bind(console,"connection error"))
db.once("open",()=>{
    console.log('Database connected')
})

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/post-test',(req,res)=>{
    console.log(req.body)
    const {username,password} = req.body
    User.insertMany([
        {username,password}
    ])
    .then(data=>{
        console.log("INSERT SUCCESSFUL!")
        console.log(data)
    })
    .catch(error=>{
        console.log(error)
    })
    res.redirect('/')
})
app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})