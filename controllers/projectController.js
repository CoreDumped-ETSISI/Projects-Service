'use strict';

const Project = require('../models/project')
const config = require('../config');


function createProject(req,res){
    let projectName = req.body.projectName;
    let icon = req.body.icon;
    let recommendedParticipants = req.body.recommendedParticipants;
    let duration = req.body.duration;
    let featuresList = req.body.featuresList;
    let repository = req.body.repository || "";
    let documentationUrl = req.body.documentationUrl || "";
    let projectOwner = req.body. projectOwner;
    let participants = req.body.participants || [];
    let currentState = Project.currentState [0];


}