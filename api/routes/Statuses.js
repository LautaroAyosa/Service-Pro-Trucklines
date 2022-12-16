const statusesRouter = require('express').Router()
const statusesController = require('../controller/Statuses')

statusesRouter.get('/', statusesController.getStatuses)
statusesRouter.post('/', statusesController.createStatus)

module.exports = statusesRouter