const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

const port = 3000;

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/word', urlencodedParser, (req, res) => {
    console.log(`post` + req.body.word);
    res.redirect('/word/' + req.body.word);
})

app.get('/word/:word', (req, res) => {
    var apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${req.params.word}`;
    fetch(apiURL)
        .then(res => res.json())
        .then(json => {
            console.log(JSON.stringify(json[0]));
            let searchedWord = json[0];
            res.render('word', { data: searchedWord });
        }).catch(err => { 
            res.send('No Word' + err.message + ' ' + req.params.word);
        });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})