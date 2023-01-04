import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDelivery } from "../redux/reducers/deliveriesReducer";

const EditDeliveries = ({delivery}) => {
    const [editedDelivery, setEditedDelivery] = useState({deliveryId: delivery.deliveryId, statusId: delivery.statusId, division: delivery.division, value: delivery.value, date: delivery.date, payed: delivery.payed})
    const statuses = useSelector(state => state.statuses)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const { name, value } = event.target
        setEditedDelivery({ ...editedDelivery, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await dispatch(updateDelivery(delivery.id, editedDelivery))
    }


    return (
            <form className="row g-3" noValidate>
                <legend>Edit Delivery <strong>{delivery.deliveryId}</strong></legend>
                <div className="col-md-12">
                    <label className="form-label">Delivery Identification</label>
                    <input className="form-control" placeholder='Delivery Id' required onChange={handleChange} value={editedDelivery.deliveryId} name='deliveryId' />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Division</label>
                    <select className="form-select" onChange={handleChange} placeholder='Division' name='division' required>
                        <option value='west' selected={delivery.division === 'west' ? "selected" : ""}>West</option>
                        <option value='east' selected={delivery.division === 'east' ? "selected" : ""}>East</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label className="form-label">Status</label>
                    <select className="form-select" onChange={handleChange} placeholder='Status' name='statusId' required>
                        {statuses.map((status, i) => <option key={i} value={status.id} selected={status.id === delivery.status.id ? "selected" : ""} >{status.name}</option>)}
                    </select>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Value</label>
                    <div className="input-group has-validation">
                        <span className="input-group-text">CAD</span>
                        <input type="number" className="form-control" placeholder='Value' onChange={handleChange} value={editedDelivery.value}  name='value' />
                    </div>
                </div>
                <div className='col-md-3'>
                    <label className='form-label'>Date</label>
                    <input type='date' className='form-control' onChange={handleChange} value={new Date(editedDelivery.date).toLocaleDateString("af-ZA")} name='date' />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Payed</label>
                    <select className="form-select" onChange={handleChange} value={editedDelivery.payed} placeholder='Payed' name='payed'>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="d-flex justify-content-center pb-3">
                    <button type='submit' className="btn btn-primary" onClick={handleSubmit}>Confirm Edit</button>
                </div>
            </form>
    )
}

export default EditDeliveries