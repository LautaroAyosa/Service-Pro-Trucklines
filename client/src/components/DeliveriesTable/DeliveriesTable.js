import React from "react";
import { useSelector } from "react-redux";

import Delivery from "./Delivery";

const DeliveriesTable = () => {
    
    const deliveries = useSelector(state => state.deliveries)


    return (
        <>
        {/* Filters */}
        <legend>Deliveries Table</legend>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Delivery Id</th>
                    <th>Status</th>
                    <th>Value</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { deliveries.map((delivery, i) => <Delivery key={i} data={delivery} />)}
            </tbody>
        </table>
        {/* Pagination */}
        </>
    )
}

export default DeliveriesTable