import React from 'react';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../store/actions/auth";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import logo1  from "../../assets/images/logo1.png"

const Register = props => {

    const [state, setState] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        if(state.firstName === ""){
            return toast.error("First name is required!");
        }else if(state.lastName === ""){
            return toast.error("Last name is required!");
        }else if(state.email === ""){
            return toast.error("Please provide email!");
        }else if(state.mobile === ""){
            return toast.error("Mobile number is required!");
        }else{
            if(state.password === ""){
                toast.error("Please provide password!");
            }else if(state.password !== state.cpassword){
                toast.error("Passwords do not match!");
            }else{
                props.register({
                    firstName: state.firstName,
                    lastName: state.lastName,
                    email: state.email,
                    mobile: state.mobile,
                    password: state.password
                });
            }
        }
    };

    if (props.isAuthenticated && props.token) {
        return <Redirect to="/data" />;
    }

    if(props.isLoadingUser){
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
            <div>
                <Container component="main" style={{maxWidth: 500}}>
                    <CssBaseline />
                    <div>
                        <img src={logo1} alt="StoxKart" />
                        <Typography component="h1" variant="h5">
                        Register
                        </Typography>
                        <form>
                        <div>
                            <TextField required 
                                style={{padding: 15}}
                                variant="outlined"
                                margin="normal"
                                id="firstName" 
                                name="firstName"
                                type="text"
                                value={state.firstName}
                                label="First Name" 
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}/>
                            <TextField required 
                                style={{padding: 15}}
                                variant="outlined"
                                margin="normal"
                                id="lastName" 
                                name="lastName"
                                type="text"
                                value={state.lastName}
                                label="Last Name" 
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}/>
                        </div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            type="text"
                            value={state.email}
                            label="Email Address"
                            name="email"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="mobile"
                            type="text"
                            value={state.mobile}
                            label="Mobile"
                            name="mobile"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={state.password}
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="cpassword"
                            label="Confirm Password"
                            type="password"
                            id="cpassword"
                            value={state.cpassword}
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                        />
                        <br />
                        <br />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={onSubmit}
                        >
                            Submit
                        </Button>
                        </form>
                    </div>
                    </Container>
            </div>
        )
    }
   
}

const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    isLoadingUser: state.auth.isLoading
});

export default connect(mapStateToProps, { register })(Register);