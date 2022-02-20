const express = require("express");
const { Client } = require('pg')
const path = require("path");
const app = express();
const fs = require("fs");
const port = 80
const bodyparser = require('body-parser')
// const url = fs.readFileSync('url.txt')

const client = new Client({
    user:'ekwahbeh',
    host:'chunee.db.elephantsql.com',
    database:'ekwahbeh',
    password:'IrJ5rU7Ctt4GyZvHl_psJwMtsXzGLj-7',
    port:5432
});


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
    var name = req.body.name;
    var branch = req.body.branch;
    var email = req.body.email;
    var pl = req.body.pl;
    var loc = req.body.loc;
    var interest = req.body.interest;
    client.connect().then(() => client.query("insert into students values ($1,$2,$3,$4,$5,$6)",[name,branch,email,pl,loc,interest])).catch(e => console.log(e)).finally(() => {
        client.end();
        res.status(200).render('index.pug');
    })
})
app.listen(process.env.PORT || port,()=>{
    console.log(`The application started successfully`)
});
