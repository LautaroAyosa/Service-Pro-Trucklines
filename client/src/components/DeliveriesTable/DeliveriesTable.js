import React, { useState } from "react";
import { useSelector } from "react-redux";
import { startOfDay, endOfDay, addDays, subDays, startOfMonth, endOfMonth } from 'date-fns';
import Filter from "../Filter";
import Pagination from "../Pagination";

import Delivery from "./Delivery";
import DateFilter from "../DateFilter";

const DeliveriesTable = () => {
    const deliveries = useSelector(state => state.deliveries)
    const filter = useSelector(state => state.filter)
    const [currentPage, setCurrentPage] = useState(1)
    const [rows, setRows] = useState(10)

    const now = new Date()
    const [dates, setDates] = useState([new Date(now.getFullYear(), now.getMonth(), 1), now])

    // Filter deliveries by deliveryId using the search input
    const searchFiltered = deliveries.filter((delivery) => {
        if (filter === "") {
            return delivery;
        } else {
            let lowerCase = filter.toLowerCase()
            return delivery.deliveryId.toLowerCase().includes(lowerCase)
        }
    }) 

    // Filter the searchFiltered object by date
    const filteredDeliveries = searchFiltered.filter((delivery) => {
        if(dates === null) {
            return delivery.date
        } else {
            // console.log(delivery.date)
            // console.log('date 0: ', startOfDay(dates[0]))
            // console.log('date 1: ', endOfDay(dates[1]))
            return delivery.date >= dates[0].toISOString() && delivery.date <= dates[1].toISOString()
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
            <div className="d-flex py-3 align-items-center">
                <span className="px-2">
                    <strong>{filteredDeliveries.length}</strong> Deliveries found
                </span>
                <div className="d-flex px-2">
                    <select onChange={event => setRows(event.target.value)} className="form-select">
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <Filter />
                <div className="px-2">
                    <DateFilter dates={dates} setDates={setDates} />
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Delivery Id</th>
                        <th>Status</th>
                        <th>Division</th>
                        <th>Value</th>
                        <th>Date</th>
                        <th>Payed</th>
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