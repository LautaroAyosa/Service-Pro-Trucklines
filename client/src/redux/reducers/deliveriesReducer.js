import deliveriesServices from '../../services/deliveries'
import { createNotification } from './notificationReducer'

const deliveriesReducer = (state = [], action) => {
    switch (action.type) {
        case '@deliveries/init':
            return action.payload
        case '@deliveries/new_delivery':
            return [...state, action.payload]
        case '@deliveries/update_delivery':
            const updatedDelivery = action.payload.delivery
            return state.map(delivery => (delivery.id !== action.payload.id ? delivery : updatedDelivery))
        case '@deliveries/add_like':
            console.log(action.payload)
            return state.map(delivery => (delivery.id !== action.payload.id ? delivery.likes: action.payload.likes))
        case '@deliveries/remove_delivery':
            return state.filter((delivery) => delivery.id !== action.payload)
        default:
            return state
    }
}

export const initDeliveries = () => {
    return async (dispatch) => {
        const deliveries = await deliveriesServices.getAll()        
        dispatch({
            type: '@deliveries/init',
            payload: deliveries
        })
    }
}

export const createDelivery = (delivery) => {
    return async (dispatch) => {
        try {
            const addedDelivery = await deliveriesServices.create(delivery)
            dispatch( {
                type: '@deliveries/new_delivery',
                payload: addedDelivery
            })
            dispatch(createNotification(
                `New delivery "${addedDelivery.deliveryId}" added successfuly!`,
                'success'
            ))
        } catch (error) {
            dispatch(createNotification(error.response.data.error, 'error'))
        }
    } 
}

export const updateDelivery = (id, deliveryToUpdate) => {
    return async (dispatch) => {
        try {
            const updatedDelivery = await deliveriesServices.update(id, deliveryToUpdate)
            dispatch({
                type: '@deliveries/update_delivery',
                payload: {id: id, delivery: updatedDelivery}
            })
            dispatch(createNotification(`"${updatedDelivery.delivery.Id}" updated successfuly`, 'success'))
        } catch (error) {
            dispatch(createNotification(error.response.data.error, 'error'))
        }
    }
}
export const updateDeliveryStatus = (id, statusId) => {
    return async (dispatch) => {
        try {
            const updatedDelivery = await deliveriesServices.patchStatus(id, statusId)
            dispatch({
                type: '@deliveries/update_delivery',
                payload: {id: id, delivery: updatedDelivery}
            })
            dispatch(createNotification(`Delivery "${updatedDelivery.deliveryId}" updated successfuly`, 'success'))
        } catch (error) {
            dispatch(createNotification(error.response.data.error, 'error'))
        }
    }
}

export const removeDelivery = (id) => {
    return async (dispatch) => {
        try {
            const removedDelivery = await deliveriesServices.remove(id)
            dispatch ({
                type: '@deliveries/remove_delivery',
                payload: id
            })
            dispatch(createNotification(
                `Delivery"${removedDelivery.deliveryId}" removed successfuly!`,
               'success'
            ))
        } catch (error) {
            dispatch(createNotification(error.response.data.error, 'error'))
        }
    }
}

export default deliveriesReducer