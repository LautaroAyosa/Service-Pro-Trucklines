import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatter } from "../utils/formatter";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'
import DateFilter from "./DateFilter";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);


export const StatusSummary = () => {
    const deliveries = useSelector(state => state.deliveries)
    const statuses = useSelector(state => state.statuses)

    const now = new Date()
    const [dates, setDates] = useState([new Date(now.getFullYear(), now.getMonth(), 1), now])

    // Filter the searchFiltered object by date
    const filteredDeliveries = deliveries.filter((delivery) => {
        if(dates === null) {
            return delivery.date
        } else {
            return delivery.date >= dates[0].toISOString() && delivery.date <= dates[1].toISOString()
        }
    })

    return (
        <div className="row gx-3 align-items-center rounded-4 shadow-sm">
            <div className="d-flex pt-3 px-4 justify-content-start align-items-center">
                <div className="d-flex flex-column pe-5">
                    <legend className="mb-0">Deliveries per Status </legend>
                    <span>Analizing from {filteredDeliveries.length} deliveries</span>
                </div>
                <DateFilter dates={dates} setDates={setDates} />
            </div>
            <div className="col-md-4">
                <table className="table">
                    <thead className="">
                        <tr>
                            <th>Status</th>
                            <th>Sum</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statuses.map((status, i) => {
                            const thisDeliveries = filteredDeliveries.filter(delivery => delivery.status.name === status.name)
                            
                            return <EachStatus key={i} status={status.name} thisDeliveries={thisDeliveries} />
                        })}
                        <tr className="table-secondary">
                            <th>Grand Total</th>
                            <td>{formatter.format(filteredDeliveries.reduce((acc, current) => acc + current.value, 0 ))}</td>
                            <td>{filteredDeliveries.length}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="col-md-8">
                <StatusChart deliveries={filteredDeliveries} />
            </div>
        </div>
    )    
}

const EachStatus = ({status, thisDeliveries}) => {

    const sum = thisDeliveries.reduce((acc, current) => acc + current.value, 0 )

    return (
        <tr>
            <td>{status}</td>
            <td>{formatter.format(sum)}</td>
            <td>{thisDeliveries.length}</td>
        </tr>
    )
}

export const StatusChart = ({deliveries}) => {
    const statuses = useSelector(state => state.statuses)

    const results = statuses.map(status => {
        const thisDeliveries = deliveries.filter(delivery => delivery.status.name === status.name)
        const sum = thisDeliveries.reduce((acc, current) => acc + current.value, 0 )
        
        return {
            status: status.name,
            sum: sum,
            count: thisDeliveries.length
        }
    })

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Deliveries per Status',
            },
        },
        scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
            }
        },
      };

    const data = {
        labels: results.map(result => result.status),
        datasets: [
            {
                label: 'Sum per Status',
                data: results.map(result => result.sum),
                yAxisID: 'y',
                backgroundColor: '#466FF1'
            },
            {
                label: 'Deliveries per Status',
                data: results.map(result => result.count),
                yAxisID: 'y1',
                backgroundColor: '#F15B5B'
            }
        ]
    }

    return (
        <div className="p-4 rounded-4">
            <Bar data={data} options={options} />
        </div>
    )
}