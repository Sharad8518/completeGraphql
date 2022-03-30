
import mongoose from "mongoose";

const userSchema = mongoose.Schema({

firstName:{
type:String,
required:true
},

lastName:{
 type:String,
 required:true


},
 email:{
 type:String,
 required:true

 },

 mobile:{
type:String,
required:true
 },

 city:{
type:String,
required:true

 },
state:{
    type:String,
    required:true
},
password:{

type:String,
required:true
},


story:{

type:String,
required:true
}


})

mongoose.model("User",userSchema)




