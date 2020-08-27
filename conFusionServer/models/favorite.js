const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FavoriteSchema = new Schema({
    
    dishes:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    },
    users:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
timestamps: true
});

module.exports = mongoose.model('Favorites', FavoriteSchema);



