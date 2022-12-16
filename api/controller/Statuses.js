const { Status } = require('../models/Delivery')

const getStatuses = async (req, res) => {
    const statuses = await Status.findAll()
    res.status(200).json(statuses)
}

const createStatus = async (req, res) => {
    try {
        const { name } = req.body

        const status = await Status.create({
            name
        })

        res.status(201).json(status)
    } catch(err) {
        console.log(err)
    }
} 

module.exports = {
    getStatuses,
    createStatus
}