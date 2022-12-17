import React, { useState } from "react";
import { useSelector } from "react-redux";
import Filter from "../Filter";
import Pagination from "../Pagination";

import Delivery from "./Delivery";

const DeliveriesTable = () => {
    const deliveries = useSelector(state => state.deliveries)
    const filter = useSelector(state => state.filter)
    const [currentPage, setCurrentPage] = useState(1)
    const [rows, setRows] = useState(10)

    // Filter deliveries by deliveryId using the search input
    const filteredDeliveries = deliveries.filter((delivery) => {
        if (filter === "") {
            return delivery;
        } else {
            let lowerCase = filter.toLowerCase()
            return delivery.deliveryId.toLowerCase().includes(lowerCase)
        }
    }) 

    // Get Current Posts
    const indexOfLastPost = currentPage * rows
    const indexOfFirstPost = indexOfLastPost - rows

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)


    return (
        <>
            <legend>Deliveries Table</legend>
            <div className="d-flex  py-3">
                <div className="d-flex pe-3">
                    <select onChange={event => setRows(event.target.value)} className="form-select">
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <Filter />
            </div>
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
                    { filteredDeliveries.slice(indexOfFirstPost,indexOfLastPost).map((delivery, i) => <Delivery key={i} data={delivery} />)}
                </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center">
                <Pagination rows={rows} count={filteredDeliveries.length} paginate={paginate} currentPage={currentPage} />
                <button className="btn btn-primary" id="deliveries-save-btn" disabled>Save</button>
            </div>
        </>
    )
}

export default DeliveriesTable