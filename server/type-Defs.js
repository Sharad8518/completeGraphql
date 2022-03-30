import {gql} from "apollo-server"



const typeDefs =gql`


type User {
  id:ID!
  firstName:String!
  lastName:String!
  email:String!
  mobile:String!
  city:String!
  state:String!
  password:String!
  story:String!
}

input UserInput {
  firstName:String!
  lastName:String!
  email:String!
  mobile:String!
  city:String!
  state:String!
  password:String!
  story:String!
}


input UserSigninInput{
  email:String!
  password:String!
}

type Token{
token:String
}

input UserUpdateInput{
  userid:ID
  firstName:String
  lastName:String
  email:String
  mobile:String
  city:String
  state:String
  story:String
}

type Query{
  users :[User]
  user(_id:ID):User
}

type Mutation {
  createUser(newUser:UserInput):User
  signinUser(userSignin:UserSigninInput):Token
  deleteUser(userid:ID):User
  updateUser(userUpdate:UserUpdateInput):User
}





`
export default typeDefs