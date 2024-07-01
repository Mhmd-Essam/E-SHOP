const  mongoose = require('mongoose');


const SubCategorySchema = new mongoose.Schema({
    name: {
        type:String, 
        trim:true,
        unique:true,
        minlength:[2,"To short subcategory name"], 
        maxlength:[32,"To long subcategory name"]
    }, 
    slug:{
        type:String, 
        lowercase:true
    }, 
    category:{ 
        type:mongoose.Schema.ObjectId, 
        ref:'Category', 
        required:[true,"subCategory must be belong to parent category"]
    }
},{timestamps:true})


module.exports= mongoose.model('subCategory',SubCategorySchema); 

