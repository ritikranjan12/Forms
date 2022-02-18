const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const port = 80
let count = 1

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
    name1 = req.body.name
    branch = req.body.branch
    pl = req.body.pl
    loc = req.body.loc
    icd = req.body.icd

    outputtext = `My name is ${name1} of ${branch} branch. I know ${pl} programming language and ${loc} in coding.My interest in coidng is ${icd}`;


    fs.writeFileSync(`output${count}.txt`,outputtext)
    
    const param = {'message' : "Your foem value is submitted successfully"}
    res.status(200).render('index.pug',param);
    count++;
})
app.listen(port,()=>{
    console.log(`The application started successfully`)
});
