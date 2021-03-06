import React, {Component} from 'react';
import axios from 'axios';
import classes from './User.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import COUNTRIES from '../../constants/countries';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import 'font-awesome/css/font-awesome.min.css';

const initState = {
    firstName: '',
    lastName: '',
    email: '',
    gender: 1,
    birthdate: null,
    country: COUNTRIES[0],
    mobile: '',
    portraitURL: '',
    formStatusObj:{
        readOnly: false,
        createUser: true
    },
    errorObj: {
        firstName: true,
        email: true,
        birthdate: true,
        mobile: true,
        portraitURL: true,
        formValid: true
    }
}
export default class User extends Component{

    constructor(props){
        super(props);
        this.state = initState;
    }

    componentDidMount(){
        this.userID = this.props.location && this.props.location.state ? this.props.location.state.userID : undefined;
        console.log(`Here in User Component with userID: ${this.userID}`);
        if(this.userID){
            axios.get(`http://localhost:5000/users/${this.userID}`)
                 .then(response => {
                    console.log(response.data);
                    this.userData = response.data;
                    this.setState({
                        firstName: response.data.firstName || '',
                        lastName: response.data.lastName || '',
                        email: response.data.email || '',
                        gender: response.data.gender,
                        birthdate: new Date(...response.data.birthdate.split('T')[0].split('-')) || '',
                        country: response.data.country || '',
                        mobile: response.data.mobile || '',
                        portraitURL: response.data.portraitURL || '',
                        formStatusObj: {
                            readOnly: true,
                            createUser: false
                        }
                    })
                 })
                 .catch(err => {
                     console.log(`Error: ${err}`);
                 })
        }
    }   

    handlePersonalDetailsChange = (event) => {
        let {name, value} = event.target;
        if(name === 'gender')
            value = +value;
        this.setState({
            [name]: value
        })
    }

    handleBirthdayChange = (date) => {
        this.setState({
            birthdate: date
        });
    }

    handleCountryChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    getUserObj = (user) => {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            birthdate: user.birthdate,
            country: user.country,
            mobile: user.mobile,
            portraitURL: user.portraitURL
        }
    }

    editUser = () => {
        this.setState((prevState, prevProps) => {
           return {
                formStatusObj: {
                    readOnly: false,
                    createUser: prevState.formStatusObj.createUser
                }
            }
        })
    }
    //^^example of using setState with prevState param ---Could have just set it to false as edit happens only when clicked on a tile
    cancelEdit = () => {
        this.setState({
            ...this.getUserObj(this.userData),
            formStatusObj: {
                readOnly: true,
                createUser: false
            }
        })
    }
    validateForm = () => {
        let errorObj = {
            firstName: false,
            email: false,
            birthdate: false,
            mobile: false,
            portraitURL: true, //true because its not mandatory but if entered, it should be valid
            formValid: false
        }
        //firstName validation
        if(!this.state.firstName){
            errorObj.firstName = false;
        }else{
            //Check for Valid name i.e. alphanumeric only
            let regex = new RegExp(/^[a-z0-9]+$/, 'i');
            if(regex.test(this.state.firstName))
                errorObj.firstName = true
            else
                errorObj.firstName = false;
        }
        //firstName validation
        if(!this.state.email){
            errorObj.email = false;
        }else{
            //Check for Valid email
            let regex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            if(regex.test(this.state.email))
                errorObj.email = true
            else
                errorObj.email = false;
        }
        //Validate Birthdate
        if(!this.state.birthdate)
            errorObj.birthdate = false;
        else
            errorObj.birthdate = true;
        //Validate Mobile Number
        if(!this.state.mobile){
            errorObj.mobile = false;
        }else{
            //Check for Mobile Number i.e. start with + or numbers
            let regex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'im');
            if(regex.test(this.state.mobile))
                errorObj.mobile = true
            else
                errorObj.mobile = false;
        }
        if(this.state.portraitURL){
            let regex = new RegExp(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/, 'gi');
            if(regex.test(this.state.portraitURL))
                errorObj.portraitURL = true
            else
                errorObj.portraitURL = false;
        }
        if(errorObj.firstName && errorObj.mobile && errorObj.birthdate && errorObj.email && errorObj.portraitURL){
            //Form is Valid
            errorObj.formValid = true;
            return errorObj;
        }else{
            errorObj.formValid = false;
            return errorObj;
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errorObj = this.validateForm();
        if(errorObj.formValid){
            //Check if update or create new User
            const user = this.getUserObj(this.state);
            if(this.state.formStatusObj.createUser){
                //Create User
                axios.post('http://localhost:5000/users/add', user)
                     .then(res => {
                         console.log(res.data); 
                     })
                     .catch(err => console.log(err));
            }else{
                //Update User
                axios.post(`http://localhost:5000/users/update/${this.userID}`, user)
                     .then(res => {
                         console.log(res.data);
                     })
                     .catch(err => {
                         console.log(err)
                     });
                     
            }
            this.props.history.push({
                pathname: '/'
            });
        }else{
            this.setState({
                errorObj: {...errorObj}
            })
            return;
        }
    }

    render(){       
        let buttons;
        if(this.state.formStatusObj.createUser){
            buttons = <button data-testid="addUserButton" className="btn btn-primary btn-lg btn-block" onClick={this.handleSubmit} type="submit">Add User</button>;
        }else{
            if(this.state.formStatusObj.readOnly){
                buttons = <button className="col-sm-12 btn btn-primary btn-lg" onClick={this.editUser}>Edit User</button>;
            }else{
                buttons =   <div className="col-sm-12">
                                <button className="col-sm-5 m-1 btn btn-secondary" onClick={this.cancelEdit}>Cancel</button>
                                <button data-testid="updateUser" className="col-sm-5 m-1 btn btn-primary" onClick={this.handleSubmit} type="submit">Update User</button>
                            </div>
            }
        }
        return(
            <React.Fragment>
                <div className={classes.page}>
                    {/* Form Header */}
                    <div >
                        <h2 className={["progress-bar", "bg-warning", "text-muted", "pl-2", classes.heading].join(" ")}>Creating a new User</h2>
                    </div>
                    {/* Form Sections Overview */}
                    {/* <div className="col-sm-9">
                        <div className={[classes['inline-block'], classes.icons].join(' ')}>
                            <i className="fas fa-user fa-3x"></i>
                            <span className={classes.left}>1.Personal details</span>    
                        </div>
                        <div className={[classes['inline-block'], classes.icons].join(' ')}>
                            <i className="fas fa-star fa-3x"></i>
                            <span className={classes.left}>2. Your favorites</span>
                        </div>
                    </div> */}
                    {/* Form Begins here */}
                    <div className="container">
                        <div className="text-center pl-4">
                            <h2 className={classes['align-left']}>Your Personal Details</h2>
                        </div>
                        <div className="col-sm-12">
                            <form name="personalDetailsForm" className="needs-validation" >
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="firstName" >First Name*: </label>
                                        <input  type="text" className="form-control" id="firstName" name="firstName"
                                                placeholder="First Name" value={this.state.firstName} maxLength="20"
                                                onChange={this.handlePersonalDetailsChange} readOnly={this.state.formStatusObj.readOnly} required/>
                                    </div>
                                    {!this.state.errorObj.firstName ? <div className="pl-3" style={{color: 'red'}}>
                                    Please enter a valid First Name
                                    </div> : null}
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="lastName" >Last Name: </label>
                                        <input  type="text" className="form-control" id="lastName" name="lastName"
                                                placeholder="Last Name" value={this.state.lastName} maxLength="20"
                                                onChange={this.handlePersonalDetailsChange} readOnly={this.state.formStatusObj.readOnly}/>
                                </div>
    
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="email" >Email Address*: </label>
                                        <input  type="email" className="form-control" id="email" name="email"
                                                placeholder="you@example.com" value={this.state.email}
                                                onChange={this.handlePersonalDetailsChange} readOnly={this.state.formStatusObj.readOnly} required={true} />
                                    </div>
                                    {!this.state.errorObj.email ? <div className="pl-3" style={{color: 'red'}}>
                                        Please enter a valid email address
                                    </div> : null}
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                    <label htmlFor="gender">Gender*: </label>
                                    <div className="form-group">
                                        <span className={["custom-control", "custom-checkbox", "p-3", classes.left].join(' ')}>
                                            <label  htmlFor="male">
                                             <input name="gender" type="radio" value={1} disabled={this.state.formStatusObj.readOnly}
                                                    className="form-check-input" checked={this.state.gender === 1}
                                                    onChange={this.handlePersonalDetailsChange} required />Male
                                            </label>
                                            
                                        </span>
                                        <span className={["custom-control", "custom-checkbox", "p-3", classes.left].join(' ')}>
                                            <label  htmlFor="female">
                                                <input  name="gender" type="radio" value={0} disabled={this.state.formStatusObj.readOnly}
                                                        className="form-check-input" checked={this.state.gender === 0}
                                                        onChange={this.handlePersonalDetailsChange} required />Female
                                            </label>
                                            
                                        </span>
                                        <span className={["custom-control", "custom-checkbox", "p-3", classes.left].join(' ')}>
                                            <label  htmlFor="unspecified">
                                                 <input name="gender" type="radio" value={-1} disabled={this.state.formStatusObj.readOnly}
                                                        className="form-check-input" checked={this.state.gender === -1}
                                                        onChange={this.handlePersonalDetailsChange} required />Unspecified
                                            </label>
                                            
                                        </span>
                                    </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="portraitURL" >Portrait URL: </label>
                                        <input  type="text" className="form-control" id="portraitURL" name="portraitURL"
                                                placeholder="Share your picture" value={this.state.portraitURL}
                                                onChange={this.handlePersonalDetailsChange} readOnly={this.state.formStatusObj.readOnly}/>
                                    </div>
                                    {!this.state.errorObj.portraitURL ? <div className="pl-3" style={{color: 'red'}}>
                                        Please enter a valid URL
                                    </div> : null }
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="birthday" >Date of Birth*: </label>
                                        <div className="input-group-addon col-sm-12" style={{textAlign: "initial"}}>
                                            <DatePicker selected={this.state.birthdate ? this.state.birthdate : null}
                                                        onChange={this.handleBirthdayChange} readOnly={this.state.formStatusObj.readOnly}/>
                                        </div>
                                    </div>
                                    {!this.state.errorObj.birthdate ? <div className="pl-3" style={{color: 'red'}}>
                                        Please select your Date of Birth
                                    </div> : null }
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="country" >Country*: </label>
                                        <select name="country" onChange={this.handleCountryChange} value={this.state.country}
                                                className="custom-select d-block w-100" id="country" disabled={this.state.formStatusObj.readOnly}>
                                            {
                                                COUNTRIES.map((country, index) => <option key={index}>{country}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="mobile" >Mobile Number*: </label>
                                        <input  type="text" className="form-control" id="mobile" name="mobile"
                                                placeholder="Mobile" value={this.state.mobile} required
                                                onChange={this.handlePersonalDetailsChange} readOnly={this.state.formStatusObj.readOnly}/>
                                    </div>
                                    {!this.state.errorObj.mobile ? <div className="pl-3" style={{color: 'red'}}>
                                        Please enter a valid mobile number
                                    </div> : null}
                                </div>
                                <hr className="mb-4"/>
                                {buttons}                               
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}