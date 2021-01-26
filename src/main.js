import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Authorization/Register";
import Login from "./components/Authorization/Login";
import Header from "./components/Common/Header";
import Metadata from "./components/Data/Metadata";
import Equitydata from "./components/Data/Equitydata";
import { connect } from "react-redux";

const Main = props => {
    return (
        <Grid container>
            <Grid item xs={12}>
            <Header />
            <ToastContainer closeOnClick hideProgressBar={true} transition={Zoom} />
            <Router>
                <div className="App">
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/data" component={Metadata} />
                    <Route exact path="/equity/:id" component={Equitydata} />
                </Switch>
                </div>
            </Router>
            </Grid>
        </Grid>  
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
});
  
export default connect(mapStateToProps)(Main);

