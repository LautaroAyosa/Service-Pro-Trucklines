const { Delivery } = require('../models/Delivery')
const { Status } = require('../models/Delivery')

const getDeliveries = async (req, res) => {
    // Find all delivery records in the database, including the related Status models
    const deliveries = await Delivery.findAll({
        include: [
            Status
        ]
    })

    // Send the list of delivery records as a JSON response to the client with a status code of 200 (OK)
    res.status(200).json(deliveries)
}

const getOneDelivery = async (req, res) => {
    // Find a single delivery record in the database where the id field matches the id parameter in the request URL,
    // including the related Status model
    const delivery = await Delivery.findOne({
        where: {id: req.params.id},
        include: [
            Status
        ]
    })
    
    // If the delivery record was found, send it as a JSON response to the client with a status code of 200 (OK)
    if (delivery) {
        res.status(200).json(delivery)
    } else {
        // Otherwise, send a 404 error and an error message as a JSON response
        res.status(404).json({error: "No delivery found with that ID."})
    }
}


const createDelivery = async (req, res) => {
    try {
        // Retrieve the deliveryId, value and statusId from the request body
        const { deliveryId, value, statusId } = req.body

        // Create a new delivery object with the information provided
        const delivery = await Delivery.create({
            deliveryId,
            value,
            statusId
        })

        // Reload the delivery record to include the related Status model
        await delivery.reload({
            include: [{
                model: Status,
            }]
        })

        // Send the new delivery object as a JSON response to the client with a status code of 201 (Created)
        res.status(201).json(delivery)
    } catch(err) {
        // Log any errors that occurred during the process
        console.log(err)
    }
}

const patchStatus = async (req, res) => {
    try {
        // Retrieve the statusId from the request body
        const { statusId } = req.body
        
        // Find a single delivery record in the database where the id field matches the id parameter in the request URL
        const delivery = await Delivery.findOne({where: {id: req.params.id}})

        // If the delivery record was NOT found, send a JSON response to the client with a status code of 404 (Not Found) and an error message
        if (!delivery) {
            res.status(404).json({error: "No delivery found with that ID. The delivery could not be updated."})
        }
        // Update the statusId field of the delivery with the new value
        await delivery.update({statusId: statusId})

        // Reload the delivery record with the updated data, including the related Status model
        await delivery.reload({
            include: [{
                model: Status,
            }]
        })

        // Send the updated delivery object as a JSON response to the client with a status code of 200 (OK)
        res.status(200).json(delivery)
    } catch(err) {
        // Log any errors that occurred during the process
        console.log(err)
    }
}

const deleteDelivery = async (req, res) => {
    try {
        // Find a single delivery record in the database where the id field matches the id parameter in the request URL
        const delivery = await Delivery.findOne({where: {id: req.params.id}})

        // If the delivery record was found, delete it from the database
        if (delivery){
            await delivery.destroy()
            // Send the deleted delivery record as a JSON response to the client with a status code of 200 (OK)
            res.status(200).json(delivery)
        } else {
            // Otherwise, send a 404 error and an error message as a JSON response
            res.status(404).json({error: "No delivery found with that ID. The delivery could not be deleted."})
        }

    } catch(err) {
        // Log any errors that occurred during the process
        console.log(err)
    }
}


module.exports = {
    getDeliveries,
    getOneDelivery,
    createDelivery,
    patchStatus,
    deleteDelivery
}
