import React, { useState } from 'react'

import { createDelivery } from '../../redux/reducers/deliveriesReducer'
import { useDispatch, useSelector } from 'react-redux'


const Form = () => {
    const [delivery, setDelivery] = useState({deliveryId: '', statusId: '', division: '', value: '', date: '', payed: ''})
    const statuses = useSelector(state => state.statuses)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const { name, value } = event.target
        setDelivery({ ...delivery, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await dispatch(createDelivery(delivery))
        setDelivery({deliveryId: '', statusId: '', division: '', value: '', date: '', payed: ''})
    }


    return (
            <form className="row g-3" noValidate>
                <legend>Add new delivery</legend>
                <div className="col-md-12">
                    <label className="form-label">Delivery Identification</label>
                    <input className="form-control" placeholder='Delivery Id' required onChange={handleChange} value={delivery.deliveryId} name='deliveryId' />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Division</label>
                    <select className="form-select" onChange={handleChange} value={delivery.division} placeholder='Division' name='division' required>
                        <option value=''>Please choose an option</option>
                        <option value='west'>West</option>
                        <option value='east'>East</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label className="form-label">Status</label>
                    <select className="form-select" onChange={handleChange} value={delivery.statusId} placeholder='Status' name='statusId' required>
                        <option value=''>Please choose an option</option>
                        {statuses.map((status, i) => <option key={i} value={status.id} >{status.name}</option>)}
                    </select>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Value</label>
                    <div className="input-group">
                        <span class="input-group-text" id="basic-addon1">CAD</span>
                        <input type="number" className="form-control" placeholder="Value" aria-label="Value" aria-describedby="basic-addon1" onChange={handleChange} value={delivery.value}  name='value' />
                    </div>
                </div>
                <div className='col-md-3'>
                    <label className='form-label'>Date</label>
                    <input type='date' className='form-control' onChange={handleChange} value={delivery.date} name='date' />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Payed</label>
                    <select className="form-select" onChange={handleChange} value={delivery.payed} placeholder='Payed' name='payed'>
                        <option value=''>Please choose an option</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="mb-3">
                    <button type='submit' className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
    )
}

export default Form