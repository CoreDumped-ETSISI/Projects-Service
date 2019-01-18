'use strict';

const Project = require('../models/project')
const config = require('../config')
const input = require('../inputValidators')


function createProject(req,res){
    let projectName = req.body.projectName
    let icon = req.body.icon
    let recommendedParticipants = req.body.recommendedParticipants
    let duration = req.body.duration
    let featuresList = req.body.featuresList
    let projectOwner = req.body. projectOwner

    if (!input.validFeaturesList(featuresList)) return res.status(400).send({message: "Error en la lista de funcionalidades"})
    if (!input.validDuration(duration)) return res.status(400).send({message: "Error en la duración en semanas del proyecto"})
    if (!input.validParticipants(participants)) return res.status(400).send({message: "Error en los participantes"})
    if (!input.validProductOwner(projectOwner)) return res.status(400).send({message: "Error en el nompre del dueño del proyecto"})
    if (!input.validProjectName(projectName)) return res.status(400).send({message: "Error en el nombre del proyecto"})
    if (!input.validRecommendedParticipants(recommendedParticipants)) return res.status(400).send({message: "Error en el numero de participantes"})

    Project.findOne({projectName: projectName}, (err, project) => {
        if (err) return res.status(500).send({message: "Error del servidor."})
        if (project) return res.status(409).send({message: "Ya existe un proyecto con este nombre"})

        const project = new Project( {
            projectName: projectName,
            icon: icon,
            recommendedParticipants: recommendedParticipants,
            duration: duration,
            featuresList: featuresList,
            repository: req.body.repository || "",
            documentationUrl: req.body.documentationUrl || "",
            projectOwner: projectOwner,
            participants: req.body.participants || [],
            currentState: Project.currentState[0]
        })

        project.save((err, projectSaved) => {
            if (err) return res.status(500).send({message: "Error de la base de datos."})
            if (!projectSaved) return res.status(422).send({message: "Error al almacenar en la base de datos"})
            return res.status(200).send(projectSaved)
        })
    })
}

function getProjectByName(req, res) {
    let projectName = req.body.projectName
    if(!input.validProjectName(projectName)) return res.status(400).send({message: "El nombre no es valido"})
    Project.find(projectName, (err, project) => {
        if(err) return res.status(500).send({message: "Error del servidor"})
        if(!project) return res.status(404).send({message: "Proyecto no encontrado"})
        return res.status(200).send(user)
    })
}

function getProjectByProjectOwner(req, res) {
    let projectOwner = req.body.projectOwner
    if(!input.validProjectOwner(projectOwner)) return res.status(400).send({message: "El nombre no es valido"})
    Project.find(projectOwner, (err, project) => {
        if(err) return res.status(500).send({message: "Error del servidor"})
        if(!project) return res.status(404).send({message: "Usuario no encontrado"})
        return res.status(200).send(user)
    })
}

function getProjectList(req, res){
    Project.find({}, (err, projects) => {
        if (err) return res.status(500).send({message: "Error"})
        if (projects) return res.status(404).send({message: "Error"})
        res.status(200).send(projects)
    })
}

function getAllButFinishedOnes(req, res) {
    Project.find({currentState: currentState[0] || currentState[1] || currentState[2]}, (err, projects) =>{
        if(err) return res.status(500).send({message: "Error del servidor"})
        if(!projects) return res.status(404).send({message: "No hay proyectos encontrados"})
        return res.status(200).send(projects)
    })
}

function getAllProjectNames(req, res) {
    Project.find({currentState: currentState[0] || currentState[1] || currentState[2]}, (err, projects) =>{
        if(err) return res.status(500).send({message: "Error del servidor"})
        if(!projects) return res.status(404).send({message: "No hay proyectos encontrados"})
        return res.status(200).send(Project.projectName)
    })
}

module.exports = {
    createProject,
    getProjectByName,
    getProjectByProjectOwner,
    getProjectList,
    getAllButFinishedOnes,
    getAllProjectNames
}