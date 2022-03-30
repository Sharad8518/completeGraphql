import {ApolloServer,gql} from"apollo-server"

import typeDefs from "./type-Defs.js"
import mongoose from "mongoose"
import {MONGO_URI} from "./config.js"


mongoose.connect(MONGO_URI,{

  useNewUrlParser: true, 
  useUnifiedTopology: true 

})

mongoose.connection.on("connected",() =>{

  console.log("connect mongodb")

})

mongoose.connection.on("error",(err)  =>{

console.log("error mongodb",err)

})

import "./models/User.js"
import resolvers from "./resolvers.js"

const server = new  ApolloServer({

typeDefs,
resolvers,

})
server.listen().then(({url})=>{

  console.log(`🚀  Server ready at ${url}`);

});