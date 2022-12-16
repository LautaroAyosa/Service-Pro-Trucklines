import statusesServices from '../../services/statuses'

const statusesReducer = (state = [], action) => {
    switch (action.type) {
        case '@statuses/init':
            return action.payload
        default:
            return state
    }
}

export const initStatuses = () => {
    return async (dispatch) => {
        const statuses = await statusesServices.getAll()        
        dispatch({
            type: '@statuses/init',
            payload: statuses
        })
    }
}

export default statusesReducer