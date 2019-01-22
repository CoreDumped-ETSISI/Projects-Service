'use strict'

const express = require('express')
const router = express.Router()
var multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './iconProjects/')
    },
      
    filename: (req, file, cb) => {
        cb(null, "icon_" + Date.now())
    }
})

var upload = multer({storage: storage}).single("icon")

const projectController = require('../controllers/projectController')

router.post('/uploadIcon', function (req, res) {
    upload(req, res, function (err) {
      if (err){
        return res.status(400).send("fail saving image: " + err)
      } else {
        return res.status(200).send(req.file.path.split('/')[1])
      }
    })
  })
router.post('/createProject', projectController.createProject)
router.get('/getProjectByName', projectController.getProjectByName)
router.get('/getProjectList', projectController.getProjectList)
router.get('/getProjectByProductOwner', projectController.getProjectByProductOwner)
router.get('/getAllButFinishedOnes', projectController.getAllButFinishedOnes)
router.get('/getAllProjectNames', projectController.getAllProjectNames)

module.exports = router
