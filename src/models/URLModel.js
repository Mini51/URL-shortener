const mongoose = require('mongoose'); 

const URLSchema = new mongoose.Schema({ 
    URL: String,
    shortURL: { 
        type: String,
        unique: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('URL', URLSchema);
