import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import Button from '@material-ui/core/Button';
import mainLogo from '../../assets/images/mainLogo.png'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

const Header = props => {

    const classes = useStyles();

    const [state, setState] = React.useState({
        loginRedirect: false,
        registerRedirect: false
    });

    return (
        <div className={classes.root}>
            <AppBar position="static">
            <Toolbar>
                <div className={classes.title}>
                    <a href="/data"><img src={mainLogo} alt="StoxKart" style={{height: 45, width: 130}} /></a>
                </div>
                { props.isAuthenticated ? <div><a style={{fontSize: 18, lineHeight: 2}} href="/data"><strong>Securities</strong></a> <Button style={{float: "right", marginLeft: 20}} onClick={props.logout} variant="contained" color="danger"> Logout </Button></div>: <div>
                    <a style={{fontSize:18}} href="/"><strong>Login</strong></a>
                    <a style={{fontSize:18, marginLeft: 20}} href="/register"><strong>Register</strong></a>
                </div>}
            </Toolbar>
            </AppBar>
        </div>
    );

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
});
  
export default connect(mapStateToProps, { logout })(Header);
