const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials') 
app.set('view engine', 'hbs');


app.use((req, res , next) =>{ //Middleware
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`

    console.log(log)
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log')
        }
    });

    next();
});

// app.use((req, res, next) =>{   ===> für Wartungsarbeiten
//     res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public')); //Middleware

hbs.registerHelper('getCurrentYear', ()=>{
    return currentYear = new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
        res.render('mainPage.hbs',{
            pageTitle: 'This is the  Main Page',
            welcomeText: 'Welcome here, Jerommee!!',
            
    });
});


app.get('/about', (req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
        
     });
});

app.get('/bad', (req,res)=>{
    res.send({
        Error: 'bad request',
        Message: 'Could not connect'
    });
})


app.listen(3000, ()=>{
    console.log('server is up on port 3000');
});