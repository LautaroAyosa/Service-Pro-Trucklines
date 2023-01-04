const deliveriesRouter = require('express').Router()
const deliveriesController = require('../controller/Deliveries')

deliveriesRouter.get('/', deliveriesController.getDeliveries)
deliveriesRouter.get('/:id', deliveriesController.getOneDelivery)
deliveriesRouter.post('/', deliveriesController.createDelivery)
deliveriesRouter.put('/:id', deliveriesController.updateDelivery)
deliveriesRouter.patch('/:id', deliveriesController.patchStatus)
deliveriesRouter.delete('/:id', deliveriesController.deleteDelivery)

module.exports = deliveriesRouter