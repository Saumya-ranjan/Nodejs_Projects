import mongoose from "mongoose";
import shortId from "shortid";


const shortUrlSchema = new mongoose.Schema({
    full:{
        type:String,
    },
    short:{
        type:String,
        required:true,
        default: shortId.generate
},
   clicks:{
        type: Number,
        required:true,
        default:0
}
})

export default shortUrlSchema;