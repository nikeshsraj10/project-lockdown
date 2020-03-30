import React, {Component} from 'react';

import classes from './User.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import COUNTRIES from '../../constants/countries';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import 'font-awesome/css/font-awesome.min.css';


export default class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: 'Nikesh',
            lastName: 'Shanegere Raj',
            email: 'you@gmail.com   ',
            gender: 1,
            birthdate: null,
            country: 'India',
            mobile: '+919482042831',

        }
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

    render(){
        return(
            <React.Fragment>
                <h1>Inside User Component</h1>
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
                        <div className="col-md-8 col-sm-12">
                            <form name="personalDetailsForm" className="needs-validation" noValidate>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="firstName" >First Name: </label>
                                        <input  type="text" className="form-control" id="firstName"
                                                placeholder="First Name" value={this.state.firstName}
                                                onChange={this.handlePersonalDetailsChange} required/>
                                    </div>
                                    <div className="invalid-feedback">
                                        Valid first name is required
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="lastName" >Last Name: </label>
                                        <input  type="text" className="form-control" id="lastName"
                                                placeholder="Last Name" value={this.state.lastName}
                                                onChange={this.handlePersonalDetailsChange} required/>
                                    </div>
                                    <div className="invalid-feedback">
                                        Valid last name is required
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="email" >Email Address: </label>
                                        <input  type="email" className="form-control" id="email"
                                                placeholder="you@example.com" value={this.state.email}
                                                onChange={this.handlePersonalDetailsChange} required />
                                    </div>
                                    <div className="invalid-feedback">
                                        Please enter a validate email address
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                    <label htmlFor="gender">Gender: </label>
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
                                        <label htmlFor="birthday" >Date of Birth: </label>
                                        <div className="input-group-addon col-sm-12" style={{textAlign: "initial"}}>
                                            <DatePicker selected={this.state.birthday ? this.state.birthday : null} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="country" >Country: </label>
                                        <select value={this.state.country} className="custom-select d-block w-100" id="country">
                                            {
                                                COUNTRIES.map((country, index) => <option key={index}>{country}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="mobile" >Mobile Number: </label>
                                        <input type="text" className="form-control" id="mobile" placeholder="Mobile" required value={this.state.mobile} />
                                    </div>
                                    <div className="invalid-feedback">
                                        Please enter a validate mobile number
                                    </div>
                                </div>
                                <hr className="mb-4"/>
                                <button className="btn btn-primary btn-lg btn-block" type="submit">Add User</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}