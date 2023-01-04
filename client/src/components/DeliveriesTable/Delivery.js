import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { removeDelivery, updateDeliveryStatus } from "../../redux/reducers/deliveriesReducer";
import $ from 'jquery'
import { formatter } from "../../utils/formatter";
import EditDeliveries from "../EditDelivery";

const Delivery = ({data}) => {
    const dispatch = useDispatch()
    const [openEdit, setOpenEdit] = useState(false)
    const statuses = useSelector(state => state.statuses)

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

    return (
        <>
            <tr className={openEdit ? "table-secondary" : ""}>
                <td>{data.deliveryId}</td>
                <td>
                    <select onChange={handleChange} className="form-select" id="statusList" style={{maxWidth: '120px'}}>

                        {statuses.map((status, i) => <option key={i} value={status.id} selected={status.id === data.status.id ? "selected" : ""}>{status.name}</option>)}
                    </select>
                </td>
                <td>{data.division[0].toUpperCase() + data.division.substring(1)}</td>
                <td>{formatter.format(data.value)}</td>
                <td>{new Date(data.date).toLocaleDateString("en-US")}</td>
                <td>{data.payed ? "Yes" : "No"}</td>
                <td><Link onClick={() => setOpenEdit(!openEdit)}>Edit</Link> | <Link onClick={handleDelete}>Delete</Link> </td>
            </tr>
            { openEdit ?
                <tr className="table-secondary">
                    <td colSpan="7" className="px-3">
                        <EditDeliveries delivery={data}/>
                    </td>
                </tr>
                :
                null
            }
        </>
    )
}

export default Delivery