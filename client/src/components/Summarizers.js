import React from "react";
import { useSelector } from "react-redux";

const Summarizers = (props) => {
    const deliveries = useSelector(state => state.deliveries)
    const statuses = useSelector(state => state.statuses)

    if (props.type === 'status') {
        statuses.forEach(status => {
            const thisDeliveries = deliveries.filter(delivery => delivery.status.name === status.name)
            const sum = thisDeliveries.reduce((acc, current) => acc + current.value, 0 )
            console.log(thisDeliveries)
            console.log(sum)
            return (
                <table>
                    <tbody>
                        <td>{status}</td>
                        <td>{sum}</td>
                    </tbody>
                </table>
            )
        });
    } else return "hoal"
    
}

export default Summarizers