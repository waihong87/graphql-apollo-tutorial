const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const mongoose = require('mongoose')

const db = 'mongodb://localhost:27017/react-apollo-tutorial'

mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false})
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err))

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const app = express()

server.applyMiddleware({
    path:'/',
    app
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server connected at port ${PORT}`))