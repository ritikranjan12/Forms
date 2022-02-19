const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const port = 80
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb+srv://ritik:9340@cluster0.9dw1i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true},{useUnifiedTopology:true});

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    branch: String,
    email: String,
    pl: String,
    loc: String,
    icd: String
});
const Contact = mongoose.model('Contact', contactSchema);



// Express Specific Stuffs
app.use('/static',express.static('static'))
app.use(express.urlencoded());

// Pug specific stuffs
//for setting the template engine as pug
app.set('view engine','pug')
// set the views directory
app.set('views', path.join(__dirname, 'views'))

app.get('/',(req,res)=>{
    res.status(200).render('index.pug')
})

app.post('/',(req,res)=>{
    var mydata = new Contact(req.body);
    mydata.save().then(()=>{
        alert("Form value saved Successfully !")
        res.status(200).render('index.pug');
    }).catch(()=>{
        confirm("Form Not Saved")
        res.status(200).render('index.pug');
    })  
})
app.listen(process.env.PORT || port,()=>{
    console.log(`The application started successfully`)
});
