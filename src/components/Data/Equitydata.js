import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getEquityData, filterData } from "../../store/actions/metadata";
import { BeatLoader } from "react-spinners";
import { useParams } from "react-router";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {
    toast
} from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const useStyles2 = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function formatXAxis(tickItem) {
    return moment(tickItem).format('MMM Do YY');
}

const Equitydata = props => {

    const classes = useStyles();

    const classes2 = useStyles2();

    let { id } = useParams();

    console.log(id);
    useEffect(() => {
        props.getEquityData(id);
    }, []);

    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    const handleDateChange1 = (date) => {
        setStartDate(date);
    };

    const handleDateChange2 = (date) => {
        setEndDate(date);
    }

    const filterData = () => {
        if(!startDate && !endDate){
            toast.error("Please select atleast one date to filter data");
        }else{
            console.log(startDate);
            console.log(endDate);
            props.filterData(startDate, endDate);
        }
    }

    if (!props.isLoading && !props.isAuthenticated) {
        return <Redirect to="/" />;
    }

    if(props.loading){
        return (
            <div className="loader">
                <BeatLoader
                    size={150}
                    color={"#3399ff"}
                    loading={props.loading}
                    />
            </div>
        )
    }else{
        return(
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid item xs={12} style={{marginTop: 20}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="startData"
                                    name="startDate"
                                    label="Start Date"
                                    value={startDate}
                                    onChange={handleDateChange1}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="endDate"
                                    name="endDate"
                                    label="End Date"
                                    value={endDate}
                                    onChange={handleDateChange2}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes2.button}
                                    onClick={() => { filterData() }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <Grid item xs={4}></Grid>
                    </Grid>
                    <br />
                    <Grid item xs={12} style={{marginTop: 30}}>
                        <Paper className={classes.paper}>
                            <ResponsiveContainer width="95%" height={600}>
                                <LineChart data={props.equityData}>
                                    <Line type="monotone" dataKey="open" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="high" stroke="#4dff4d" />
                                    <Line type="monotone" dataKey="close" stroke="#ff9933" />
                                    <Line type="monotone" dataKey="low" stroke="#ff5c33" />
                                    <XAxis dataKey="date" tickFormatter={formatXAxis} />
                                    <YAxis />
                                    <Legend width={70} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '10px' }} />
                                    <Tooltip labelFormatter={(value) => moment(value).format('MMM Do YY')} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
        )
    }

}

const mapStateToProps = state => ({
    equityData: state.metadata.equityData,
    loading: state.metadata.loading,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
});
  
export default connect(mapStateToProps, { getEquityData, filterData })(Equitydata);