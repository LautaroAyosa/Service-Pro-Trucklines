import React from "react";
import { Route, Routes } from "react-router-dom";


import Sidebar from "../components/Sidebar"
import Loading from "../components/Loading";
import Form from "../components/Form/Form"
import { withAuthenticationRequired } from "@auth0/auth0-react";
import DeliveriesTable from "../components/DeliveriesTable/DeliveriesTable";
import Summarizers from "../components/Summarizers";

const Dashboard = () => (
    <>
        <Sidebar>
            <div className="dashboard-content">
                <Routes>
                    <Route path="/forms" element={<Form />} />
                    <Route path="/table" element={<DeliveriesTable />} />
                </Routes>
            </div>
        </Sidebar>
    </>
);

export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <Loading />,
  });
