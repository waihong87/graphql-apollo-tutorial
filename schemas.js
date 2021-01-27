const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const clientSchema = new Schema({
    name: {
        type: String,
        required: true,
        uniqueCaseInsensitive: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    sex: {
        type: String,
        required: true
    },
    interests: {
        type: [String],
        required: true
    },
    relatives: {
        type:[{name:{type:String}, age:{type:Number}}]
    }
})

const visitSchema = new Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clients',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const biodataSchema = new Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clients',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    systolic: {
        type: Number,
    },
    diastolic: {
        type: Number
    },
    cholesterol: {
        type: Number
    }
})

clientSchema.plugin(uniqueValidator, {message:'Client already in database'})
visitSchema.index({client:1, date:1}, {unique:true})
visitSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('Same visit has already been created before'));
    }
  })
biodataSchema.index({client:1, date:1}, {unique:true})
biodataSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Client already has the lab assessment on this date in the database'));
    }
})

const clientModel = mongoose.model('clients', clientSchema)
const visitModel = mongoose.model('visits', visitSchema)
const biodataModel = mongoose.model('biodata', biodataSchema)

const schemas = {
    clientModel,
    visitModel,
    biodataModel
}

module.exports = schemas