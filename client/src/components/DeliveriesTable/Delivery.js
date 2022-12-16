import React from "react";
import { Link } from 'react-router-dom'

const Delivery = ({data}) => {

    const handleDelete = (event) => {
        event.preventDefault()
        window.alert("hello")

    }

    return (
        <tr>
            <th scope="row">{data.deliveryId}</th>
            <td>{data.status !== null ? data.status.name : ""}</td>
            <td>{data.value}</td>
            <td><Link to={`/dashboard/deliveries/${data.id}`}>Edit</Link> | <Link onClick={handleDelete}>Delete</Link> </td>
        </tr>
    )
}

export default Delivery