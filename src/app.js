const express = require('express');
const mongoose = require('mongoose'); 
const path = require('path'); 
const config = require('./config.json'); 
const URLS = require('./models/URLModel');


const app = express(); 


// connect to the mongo database 
try {
    mongoose.connect(config.mongo.URI, { useNewUrlParser: true }); 
} catch (error) { 
    console.log(error);
}



// set public folder to serve static files 
app.use(express.static(path.join(__dirname, 'public'))); 

// get the api routes 
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// dashboard 
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
}); 

app.get('/urls/:id', (req, res) => {
    // check if the shortURL exists in the database
    URLS.findOne({ shortURL: req.params.id }, (err, doc) => {
        if (err) {
            console.log(err);
        } else if (doc) {
            res.redirect(doc.URL);
        } else {
            res.send('URL not found');
        }
    });
});





app.listen(config.server.port, () => { 
    console.log(`Server is running on port ${config.server.port}`); 
});
