import { buildSchema } from "graphql";

export default buildSchema(`
       type Time {
           _id: ID!
           title: String!
           creator: String!
           date: String!
           project: String
           startTime: String!
           endTime: String!
           h: Int!
           m: Int!
           s: Int!
       } 

       type User {
         _id: ID!
         email: String!
         password: String
         createdAt: String!
         avatar: String!
         displayName: String!
       }
       
       type AuthUser {
           userId: ID!
           email: String!
           displayName: String!
           createdAt: String!
           token: String!
           tokenExpire: Int!
       }

       input TimeInput {
        title: String!
        creator: String!
        date: String!
        project: String!
        startTime: String!
        endTime: String!
        h: Int!
        m: Int!
        s: Int!
       }

       input UpdateTime {
        _id: ID!
        title: String!
        creator: String!
        date: String!
        project: String!
        startTime: String!
        endTime: String!
        h: Int!
        m: Int!
        s: Int! 
       }

       input UserInput {
        email: String!
        password: String!
        avatar: String
        displayName: String
       }

       input Test {
           creator: String
           date: String
       }
       input Creator {
           creator: String!
       }
       input currentUser {
        id: String!
       }

       type RootQuery {
           times(test: Test): [Time!]
           allTimes(filter: Creator): [Time!]
           user(current: currentUser): User
        }

       type RootMutation {
           createTime(timeInput: TimeInput): Time
           createUser(userInput: UserInput): User
           login(email: String!, password: String!): AuthUser
           updateTime(update: UpdateTime): Time
           deleteTime(id: ID!): String
       }
       
       schema {
           query: RootQuery
           mutation: RootMutation
       }
    `);
