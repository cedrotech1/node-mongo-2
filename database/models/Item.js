const mongoose = require('mongoose');

const itemsSchema=new mongoose.Schema(
    {name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
    }

);
const Item=mongoose.model('Item',itemsSchema);
module.exports=Item;