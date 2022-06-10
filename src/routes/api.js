const express = require('express');
const { appendFile } = require('fs');
const mongoose = require('mongoose'); 
const config = require('../config.json'); 
const URLS = require('../models/URLModel'); 

const router = express.Router(); 


const authenticate = (req, res, next) => {
    if(req.headers.authorization === config.server.secret) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
        console.log(`someone tried to access the API without authorization. the secret used was ${req.headers.authorization}`);
    }
}



router.use(express.json());


router.post('/create', authenticate, (req, res) => { 
    
    const { url } = req.body; 

    if (!url) {
        res.status(400).json({ error: 'URL is required' });
    }

    // create a random 10 character string 
    const randomString = Math.random().toString(36).substring(2, 12);   
    
    // check if the random string already exists in the database
    URLS.findOne({ shortURL: randomString }, (err, doc) => {
        if (err) {
            console.log(err); 
        } else if (doc) {
            res.send('Please try again The random string already exists in the database');
        } else {
            // if the random string does not exist in the database, create a new URL 
            const newURL = new URLS({
                URL: url,
                shortURL: randomString
            });
            newURL.save((err) => {
                if (err) {
                    console.log(err); 
                } else {
                    console.log(`created new URL: ${newURL.URL} with shortURL: ${newURL.shortURL}`);
                    res.json({ 
                        URL: newURL.URL, 
                        shortURL: 'https://' + config.server.domain_name + '/' + 'URLS' + '/' + newURL.shortURL
                    })
                }
            });
        }
    });
}); 

router.delete('/delete', authenticate, (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.send('Please enter a URL');
    }
    

    URLS.findOneAndDelete({ shortURL: url }, (err, doc) => { 
        if (err) {
            console.log(err);
        } else if (doc) {
            console.log(`deleted URL: ${doc.URL} with shortURL: ${doc.shortURL}`);
            res.send(`deleted URL: ${doc.URL} with shortURL: ${doc.shortURL}`);
        } else {
            res.send('URL not found');
        }
    });
});


module.exports = router;
            



         