import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { removeDelivery, updateDeliveryStatus } from "../../redux/reducers/deliveriesReducer";
import $ from 'jquery'

const Delivery = ({data}) => {
    const dispatch = useDispatch()
    const statuses = useSelector(state => state.statuses)
    const resultStatuses = statuses.filter(status => status.name !== data.status.name);

    const handleChange = (event) => {
        $('#deliveries-save-btn').prop('disabled', false)
        .click(function() {
            dispatch(updateDeliveryStatus(data.id, event.target.value))
        })
    }

    const handleDelete = (event) => {
        event.preventDefault()
        if( window.confirm("Do you really want to delete this delivery?")) {
            dispatch(removeDelivery(data.id))
        }
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'CAD',
    });


    return (
        <>
            <tr>
                <td>{data.deliveryId}</td>
                <td>
                    <select onChange={handleChange} className="form-select" style={{maxWidth: '120px'}}>
                        <option value={data.status.id}>{data.status !== null ? data.status.name : ""}</option>
                        {resultStatuses.map((status, i) => <option key={i} value={status.id}>{status.name}</option>)}
                    </select>
                </td>
                <td>{formatter.format(data.value)}</td>
                <td><Link to={`/dashboard/deliveries/${data.id}`}>Edit</Link> | <Link onClick={handleDelete}>Delete</Link> </td>
            </tr>
        </>
    )
}

export default Delivery