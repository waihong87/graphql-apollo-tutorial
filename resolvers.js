const {
    clientModel,
    visitModel,
    biodataModel
} = require('./schemas')

const resolvers = {
    Query: {
        allClients(parent, args, context, info) {
            return clientModel.find()
                .then(res => {return res})
                .catch(err => console.log(err))
        },
        idClient(parent, {_id}, context, info) {
            return clientModel.findById(_id)
                .then(res => {return res})
                .catch(err => console.log(err))
        },
        clientVisits(parent, {client}, context, info) {
            return visitModel.find({client})
                .then(res => {return res})
                .catch(err => console.log(err))
        },
        clientBiodatas(parent, {client}, context, info) {
            return biodataModel.find({client})
                .then(res => {return res})
                .catch(err => console.log(err))
        },
        async clientProfile(parent, {_id}, context, info) {
            let client
            await clientModel.findById(_id)
                .then(res => {
                    const {_id, name, dob, email, sex, relatives, interests} = res
                    client = {
                        _id,
                        name,
                        dob,
                        email,
                        sex,
                        relatives, 
                        interests
                    }
                })
                .catch(err => console.log(err))
            await visitModel.find({client:_id})
                .then(res => {client.visits = res})
                .catch(err => console.log(err))
            await biodataModel.find({client:_id})
                .then(res => {client.biodatas = res})
                .catch(err => console.log(err))
            
            return client
        }
    },

    Mutation: {
        addClient(parent, args, context, info) {
            const {name, dob, email, sex, interests, relatives} = args
            const client = new clientModel({
                name,
                dob,
                email,
                sex,
                interests,
                relatives
            })

            return client.save()
                .then(res => {return {client:res}})
                .catch(err => {return {error:err.message}})
        },

        addVisit(parent, args, context, info) {
            const {client, date} = args
            const visit = new visitModel({
                client,
                date
            })

            return visit.save()
                .then(res => {return {visit:res}})
                .catch(err => {return {error:err.message}})
        },

        addBiodata(parent, args, context, info) {
            const {client, date, systolic, diastolic, cholesterol} = args
            const biodata = new biodataModel({
                client,
                date,
                systolic,
                diastolic,
                cholesterol
            })

            return biodata.save()
                .then(res => {return {biodata:res}})
                .catch(err => {return {error:err.message}})
        }
    }
}

module.exports = resolvers