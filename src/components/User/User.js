import React, {Component} from 'react';

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
    errorObj: {
        firstName: true,
        email: true,
        birthdate: true,
        mobile: true,
        formValid: true
    }

}

export default class User extends Component{
    constructor(props){
        super(props);
        this.state = initState;
    }

    handlePersonalDetailsChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    handleGenderChange = (genderVal) => {
        this.setState({
            gender: genderVal
        });
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

    validateForm = () => {
        let errorObj = {
            firstName: false,
            email: false,
            birthdate: false,
            mobile: false,
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
        if(errorObj.firstName && errorObj.mobile && errorObj.birthdate && errorObj.email){
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
            console.log(this.state);
            this.setState({
                ...initState
            })
        }else{
            this.setState({
                errorObj: {...errorObj}
            })
            return;
        }
        console.log(this.state);
    }

    render(){
        console.log(this.state.errorObj)
        return(
            <React.Fragment>
                <div className={classes.page}>
                    {/* Form Header */}
                    <div >
                        <h2 className={["progress-bar", "bg-warning", "text-muted", "pl-2", classes.heading].join(" ")}>Creating a new User</h2>
                    </div>
                    {/* Form Sections Overview */}
                    <div className="col-sm-9">
                        {/* <div><i className="fa fa-spinner fa-spin">Font Awesome</i></div> */}
                        <div className={[classes['inline-block'], classes.icons].join(' ')}>
                            <i className="fas fa-user fa-3x"></i>
                            <span className={classes.left}>1.Personal details</span>    
                        </div>
                        <div className={[classes['inline-block'], classes.icons].join(' ')}>
                            <i className="fas fa-star fa-3x"></i>
                            <span className={classes.left}>2. Your favorites</span>
                        </div>
                    </div>
                    {/* Form Begins here */}
                    <div className="container">
                        <div className="py-5 text-center pl-4">
                            <h2 className={classes['align-left']}>Your Personal Details</h2>
                        </div>
                        <div className="col-sm-12">
                            <form name="personalDetailsForm" className="needs-validation" >
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="firstName" >First Name*: </label>
                                        <input  type="text" className="form-control" id="firstName" name="firstName"
                                                placeholder="First Name" value={this.state.firstName} maxLength="20"
                                                onChange={this.handlePersonalDetailsChange} required/>
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
                                                onChange={this.handlePersonalDetailsChange}/>
                                    </div>
    
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="email" >Email Address*: </label>
                                        <input  type="email" className="form-control" id="email" name="email"
                                                placeholder="you@example.com" value={this.state.email}
                                                onChange={this.handlePersonalDetailsChange} required={true} />
                                    </div>
                                    {!this.state.errorObj.email ? <div className="pl-3" style={{color: 'red'}}>
                                        Please enter a valid email address
                                    </div> : null}
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                    <label htmlFor="gender">Gender*: </label>
                                    <div className="form-group" data-toggle="buttons">
                                        <span className={["custom-control", "custom-checkbox", "p-3", classes.left].join(' ')}>
                                            <label  htmlFor="male">
                                             <input id="male" name="gender" type="radio"
                                                    className="form-check-input" checked={this.state.gender === 1}
                                                    onChange={() => this.handleGenderChange(1)} required />Male
                                            </label>
                                            
                                        </span>
                                        <span className={["custom-control", "custom-checkbox", "p-3", classes.left].join(' ')}>
                                            <label  htmlFor="female">
                                                <input  id="female" name="gender" type="radio"
                                                        className="form-check-input" checked={this.state.gender === 0}
                                                        onChange={() => this.handleGenderChange(0)} required />Female
                                            </label>
                                            
                                        </span>
                                        <span className={["custom-control", "custom-checkbox", "p-3", classes.left].join(' ')}>
                                            <label  htmlFor="unspecified">
                                                 <input id="unspecified" name="gender" type="radio"
                                                        className="form-check-input" checked={this.state.gender === -1}
                                                        onChange={() => this.handleGenderChange(-1)} required />Unspecified
                                            </label>
                                            
                                        </span>
                                    </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="birthday" >Date of Birth*: </label>
                                        <div className="input-group-addon col-sm-12" style={{textAlign: "initial"}}>
                                            <DatePicker selected={this.state.birthdate ? this.state.birthdate : null} 
                                                        onChange={this.handleBirthdayChange} />
                                        </div>
                                    </div>
                                    {!this.state.errorObj.birthdate ? <div className="pl-3" style={{color: 'red'}}>
                                        Please select your Date of Birth
                                    </div> : null }
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="country" >Country*: </label>
                                        <select name="country" onChange={this.handleCountryChange} value={this.state.country} className="custom-select d-block w-100" id="country">
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
                                                onChange={this.handlePersonalDetailsChange} />
                                    </div>
                                    {!this.state.errorObj.mobile ? <div className="pl-3" style={{color: 'red'}}>
                                        Please enter a valid mobile number
                                    </div> : null}
                                </div>
                                <hr className="mb-4"/>
                                <button className="btn btn-primary btn-lg btn-block" onClick={this.handleSubmit} type="submit">Add User</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}