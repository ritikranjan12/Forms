const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const port = 80
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb+srv://ritik:9340@cluster0.9dw1i.mongodb.net/myformDatabase?retryWrites=true&w=majority',{useNewUrlParser: true},{useUnifiedTopology:true});

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    branch: String,
    email: String,
    pl: String,
    loc: String,
    icd: String
});
const formvalue = mongoose.model('formvalue', contactSchema);



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
    var mydata = new formvalue(req.body);
    mydata.save().then(()=>{
        res.send("This item is saved in the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // const param = {'message' : "Your foem value is submitted successfully"}
    // res.status(200).render('index.pug',param);
})
app.listen(process.env.PORT || port,()=>{
    console.log(`The application started successfully`)
});
