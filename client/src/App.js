import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import { useAuth0 } from "@auth0/auth0-react";

// styles
import "./sass/index.css"

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import Dashboard from "./views/Dashboard";
import { initDeliveries } from "./redux/reducers/deliveriesReducer";
import { useDispatch } from "react-redux";
import Notification from "./components/Notification";
import { initStatuses } from "./redux/reducers/statusesReducer";
initFontAwesome();

const Front = () => {
  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Container className="flex-grow-1 mt-5">
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/external-api' element={<ExternalApi/>} />
        </Routes>
      </Container>
      <Footer />
    </div>
  )
}

const Back = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initDeliveries())
    dispatch(initStatuses())
  },[dispatch])

  return (
    <div id="dashboard" className="h-100 ">
      <Routes>
        <Route path='/*' exact element={<Dashboard />} />
      </Routes>
      <Notification />
    </div>
  )
}


const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router >
      <Routes>
        <Route path='/*' element={<Front />} />
        <Route path="/dashboard/*" element={<Back />} />
      </Routes>
    </Router>
  );
};

export default App;
