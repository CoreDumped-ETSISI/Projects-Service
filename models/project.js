'use strict';

const mongoose = require('mongoose');
const ProjectSchema = mongoose.Schema;

const states = ['Pendiente', 'Definido', 'En desarrollo', 'Terminado'];

const ProjectSchema= new Schema({
    projectName: String,
    icon: File,
    recommendedParticipants: Number,
    duration: Number,
    description: String,
    featuresList: [],
    repository: String,
    documentationUrl: String,
    productOwner: String,
    participants: [],
    currentState: {type: String, enum: states, required: true}
})

module.exports = mongoose.model('Project', ProjectSchema);

