'use strict';

const Project = require('../models/project')
const config = require('../config')
const input = require('../inputValidators')

const states = ['Pendiente', 'Definido', 'En desarrollo', 'Terminado'];


function createProject(req, res){
    let projectName = req.body.projectName
    let icon = req.body.icon
    let recommendedParticipants = req.body.recommendedParticipants
    let duration = req.body.duration
    let featuresList = req.body.featuresList
    let productOwner = req.body.productOwner

    if (!input.validFeaturesList(featuresList)) return res.status(400).send({message: "Error en la lista de funcionalidades"})
    if (!input.validDuration(duration)) return res.status(400).send({message: "Error en la duración en semanas del proyecto"})
    if (!input.validProductOwner(productOwner)) return res.status(400).send({message: "Error en el nompre del dueño del proyecto"})
    if (!input.validProjectName(projectName)) return res.status(400).send({message: "Error en el nombre del proyecto"})
    if (!input.validRecommendedParticipants(recommendedParticipants)) return res.status(400).send({message: "Error en el numero de participantes"})

    Project.findOne({projectName: projectName}, (err, project) => {
        if (err) return res.status(500).send({message: "Error del servidor."})
        if (project) return res.status(409).send({message: "Ya existe un proyecto con este nombre"})

        const newProject = new Project( {
            projectName: projectName,
            icon: icon,
            recommendedParticipants: recommendedParticipants,
            duration: duration,
            featuresList: featuresList,
            repository: req.body.repository || "",
            documentationUrl: req.body.documentationUrl || "",
            productOwner: productOwner,
            participants: req.body.participants || [],
            currentState: states[0]
        })

        newProject.save((err, projectSaved) => {
            if (err) return res.status(500).send({message: "Error de la base de datos."})
            if (!projectSaved) return res.status(422).send({message: "Error al almacenar en la base de datos"})
            return res.status(200).send(projectSaved)
        })
    })
}
 
function getProjectByName(req, res) {
    let projectName = req.query.projectName
    if(!input.validProjectName(projectName)) return res.status(400).send({message: "El nombre no es valido"})
    Project.findOne({projectName: projectName}, (err, project) => {
        if(err) return res.status(500).send({message: "Error del servidor"})
        if(!project) return res.status(404).send({message: "Proyecto no encontrado"})
        return res.status(200).send(project)
    })
}

function getProjectByProductOwner(req, res) {
    let productOwner = req.query.productOwner
    if(!input.validProductOwner(productOwner)) return res.status(400).send({message: "El nombre no es valido"})
    Project.findOne({productOwner: productOwner}, (err, project) => {
        if(err) return res.status(500).send({message: "Error del servidor"})
        if(!project) return res.status(404).send({message: "Usuario no encontrado"})
        return res.status(200).send(project)
    })
}

function getProjectList(req, res){
    Project.find({}, (err, projects) => {
        if (err) return res.status(500).send({message: "Error del servidor"})
        if (!projects) return res.status(404).send({message: "Error not found"})
        res.status(200).send(projects)
    })
}

function getAllButFinishedOnes(req, res) {
    Project.find({currentState: states[0] || states[1] || states[2]}, (err, projects) =>{
        if(err) return res.status(500).send({message: "Error del servidor"})
        if(!projects) return res.status(404).send({message: "No hay proyectos encontrados"})
        return res.status(200).send(projects)
    })
}

function getAllProjectNames(req, res) {
    Project.find({}, (err, projects) =>{
        if(err) return res.status(500).send({message: "Error del servidor"})
        if(!projects) return res.status(404).send({message: "No hay proyectos encontrados"})
        
        let projectNames = []
        
        projects.forEach(project =>{
            projectNames.push(project.projectName)
        })
        
        return res.status(200).send(projectNames)
    })
}

function updateProject(req, res) {

    let updateFields = {}    
    let projectName = req.query.projectName
    if(!input.validProjectName(projectName)) return res.status(400).send({message: "El nombre no es valido"})

    if(req.body.documentationUrl) {
        updateFields.documentationUrl = req.body.documentationUrl 
    }
    if(req.body.repository) {
        updateFields.repository = req.body.repository
    }
    if(req.body.participants) {
        updateFields.participants = req.body.participants
        if (!input.validParticipants(updateFields.participants)) return res.status(400).send({'message':'Los nombres no son validos'})
    }
    if (req.body.featuresList) {
        updateFields.featuresList = req.body.featuresList
        if (!input.validFeaturesList(updateFields.featuresList)) return res.status(400).send({'message':'Las features no son validas'})
    }
    if (req.body.duration) {
        updateFields.duration = req.body.duration
        if (!input.validDuration(updateFields.duration)) return res.status(400).send({'message':'Duracion no valida'})
    }
    if (req.body.currentState) {
        updateFields.currentState = req.body.currentState
    }

    Project.findOne({projectName: projectName}, (err, project) => {
        if (err) res.status(500).send({'message':'Error del servidor'})
        if(!project) res.status(404).send({'message':'Projecto no encontrado'})

        project.set(updateFields)
        project.save((err, projectSaved) => {
            if(err) return res.status(500).send({'message':'Error del servidor'})
            return res.status(200).send(projectSaved)
        })
    })
}
module.exports = {
    createProject,
    getProjectByName,
    getProjectByProductOwner,
    getProjectList,
    updateProject,
    getAllButFinishedOnes,
    getAllProjectNames
}