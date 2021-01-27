import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getSecurityData } from "../../store/actions/securities";
import { BeatLoader } from "react-spinners";
import { useParams } from "react-router";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    toast
} from "react-toastify";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles3 = makeStyles({
  root: {
    flexGrow: 1,
  },
});

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

const SecurityData = props => {

    const classes = useStyles();

    const classes2 = useStyles2();

    let { id } = useParams();

    console.log(id);
    useEffect(() => {
        props.getSecurityData(id);
    }, []);

    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    const handleDateChange1 = (date) => {
        setStartDate(date);
    };

    const handleDateChange2 = (date) => {
        setEndDate(date);
    }

    const classes3 = useStyles3();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const filterData = () => {
        if(!startDate && !endDate){
            toast.error("Please select atleast one date to filter data");
        }else{
            console.log(startDate);
            console.log(endDate);
            props.getSecurityData(id, startDate, endDate);
            setStartDate(null);
            setEndDate(null);
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
                    <Grid item xs={12} style={{marginTop: 15}}>
                    <div>
                    {props.security
                        ? <p style={{textAlign: "left", marginLeft: 30, marginTop: 20}}>
                            <b>{props.security.securityName}</b>
                        </p>
                        : <p></p>
                    }
                    </div>
                    </Grid>
                    <Grid item xs={12} style={{marginTop: 20}}>
                        <div className={classes3.root}>
                            <AppBar position="static" color="default">
                                <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                                centered
                                >
                                <Tab label="1 Day" {...a11yProps(0)} />
                                <Tab label="1 Month" {...a11yProps(1)} />
                                <Tab label="1 Year" {...a11yProps(2)} />
                                <Tab label="3 Year" {...a11yProps(3)} />
                                <Tab label="5 Year" {...a11yProps(4)} />
                                <Tab label="Custom" {...a11yProps(5)} />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={value}
                                onChangeIndex={handleChangeIndex}
                            >
                                <TabPanel value={value} index={0} dir={theme.direction}>
                                    <Paper className={classes.paper}>
                                        <ResponsiveContainer width="95%" height={600}>
                                            <LineChart data={props.oneDaySession}>
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
                                </TabPanel>
                                <TabPanel value={value} index={1} dir={theme.direction}>
                                    <Paper className={classes.paper}>
                                        <ResponsiveContainer width="95%" height={600}>
                                            <LineChart data={props.oneMonthSessions}>
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
                                </TabPanel>
                                <TabPanel value={value} index={2} dir={theme.direction}>
                                    <Paper className={classes.paper}>
                                        <ResponsiveContainer width="95%" height={600}>
                                            <LineChart data={props.oneYearSessions}>
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
                                </TabPanel>
                                <TabPanel value={value} index={3} dir={theme.direction}>
                                    <Paper className={classes.paper}>
                                        <ResponsiveContainer width="95%" height={600}>
                                            <LineChart data={props.threeYearSessions}>
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
                                </TabPanel>
                                <TabPanel value={value} index={4} dir={theme.direction}>
                                    <Paper className={classes.paper}>
                                        <ResponsiveContainer width="95%" height={600}>
                                            <LineChart data={props.fiveYearSessions}>
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
                                </TabPanel>
                                <TabPanel value={value} index={5} dir={theme.direction}>
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
                                    <Paper className={classes.paper}>
                                        <ResponsiveContainer width="95%" height={600}>
                                            <LineChart data={props.sessions}>
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
                                </TabPanel>
                            </SwipeableViews>
                            </div>
                    </Grid>
                </Grid>
            </Grid>
        </div>
        )
    }

}

const mapStateToProps = state => ({
    security: state.securities.security,
    sessions: state.securities.sessions.reverse(),
    oneDaySession: state.securities.oneDaySession,
    oneMonthSessions: state.securities.oneMonthSessions.reverse(),
    oneYearSessions: state.securities.oneYearSessions.reverse(),
    threeYearSessions: state.securities.threeYearSessions.reverse(),
    fiveYearSessions: state.securities.fiveYearSessions.reverse(),
    loading: state.securities.loading,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
});
  
export default connect(mapStateToProps, { getSecurityData })(SecurityData);