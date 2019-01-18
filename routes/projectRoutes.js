'use strict'

const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectController')

router.post('/createProject', projectController.createProject)
router.get('/getProjectByName', projectController.getProjectByName)
router.get('/getProjectByProjectOwner', projectController.getProjectByProjectOwner)
router.get('/getAllButFinishedOnes', projectController.getAllButFinishedOnes)
router.get('/getAllProjectNames', projectController.getAllProjectNames)

module.exports = {router}
