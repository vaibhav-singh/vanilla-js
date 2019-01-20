const express = require('express')
const app = express()
const port = 3000
const shoeService = require('./service/ShoeService')
const pageData = 50

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  

app.get('/', (req, res) => res.send('App is running!'));

app.get('/api/v1/shoes', function (req, res) {
    let id;    
    if(req.query.page) {
        id = ((parseInt(req.query.page)-1)*pageData)+1;
    }
    else {
        id = 1;
    }
    res.send(shoeService.getShoeList(id, pageData))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))