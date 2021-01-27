const {gql} = require('apollo-server-express')

const typeDefs = gql`
    type Relative {
        _id: ID!
        name: String!
        age: Int!
    }

    type Client {
        _id: ID!
        name: String!
        dob: String!
        email: String!
        sex: String!
        interests: [String]!
        relatives: [Relative]!
        visits: [Visit]
        biodatas: [Biodata]
    }

    type Visit {
        _id: ID!
        client: ID!
        date: String!
    }

    type Biodata {
        _id: ID!
        client: ID!
        date: String!
        systolic: Int
        diastolic: Int
        cholesterol: Float
    }

    type VisitResponse {
        visit: Visit
        error: String
    }

    type BiodataResponse {
        biodata: Biodata
        error: String
    }

    type Query {
        allClients: [Client]!
        idClient(_id:ID!): Client!
        clientVisits(client:ID!): [Visit]!
        clientBiodatas(client:ID!): [Biodata]!
        idVisit(_id:ID!): Visit!
        clientProfile(_id:ID!): Client!
    }

    input RelativeInput {
        name: String!
        age: Int!
    }

    type ClientResponse {
        client: Client
        error: String
    }

    type Mutation {
        addClient(
            name: String!
            dob: String!
            email: String!
            sex: String!
            interests: [String]!
            relatives: [RelativeInput]!
        ): ClientResponse!

        addVisit(
            client: ID!
            date: String!
        ): VisitResponse!

        addBiodata(
            client: ID!
            date: String!
            systolic: Int
            diastolic: Int
            cholesterol: Float
        ): BiodataResponse!
    }
`
module.exports = typeDefs
