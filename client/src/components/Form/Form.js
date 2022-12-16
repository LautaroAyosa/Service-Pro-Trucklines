import React, { useState } from 'react'

import { createDelivery } from '../../redux/reducers/deliveriesReducer'
import { useDispatch, useSelector } from 'react-redux'


const Form = () => {
    const [delivery, setDelivery] = useState({deliveryId: '', statusId: '', value: ''})
    const statuses = useSelector(state => state.statuses)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const { name, value } = event.target
        setDelivery({ ...delivery, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await dispatch(createDelivery(delivery))
        setDelivery({deliveryId: '', statusId: '', value: ''})
    }


    return (
            <form className="row g-3" noValidate>
                <legend>Add new delivery</legend>
                <div className="col-md-12">
                    <label className="form-label">Delivery Identification</label>
                    <input className="form-control" placeholder='Delivery Id' required onChange={handleChange} value={delivery.deliveryId} name='deliveryId' />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select className="form-select" onChange={handleChange} placeholder='Status' name='statusId' required>
                        <option value=''>Please choose an option</option>
                        {statuses.map((status, i) => <option key={i} value={status.id} >{status.name}</option>)}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Value</label>
                    <div className="input-group has-validation">
                        <span className="input-group-text">CAD</span>
                        <input type="number" className="form-control" placeholder='Value' onChange={handleChange} value={delivery.value}  name='value' />
                    </div>
                </div>
                <div className="mb-3">
                    <button type='submit' className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
    )
}

export default Form