import React from "react";
import { useSelector } from "react-redux";
import { StatusSummary } from "./Summarizers";

const DashboardSummary = () => {

    return (
        <>  
            <div className="row">
                <div className=""><StatusSummary /></div>
            </div>
        </>
    )
}

export default DashboardSummary