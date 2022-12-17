import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/deliveries'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const getOne = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const create = async (delivery) => {
    const response = await axios.post(baseUrl, delivery)
    return response.data
}
const patchStatus = async (id, statusId) => {
    const response = await axios.patch(`${baseUrl}/${id}`, {statusId: statusId})
    return response.data
}
const remove = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

// eslint-disable-next-line
export default {
    getAll,
    getOne,
    create,
    patchStatus,
    remove,
}