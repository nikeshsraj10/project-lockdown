import React, {Component} from 'react';
import classes from './FormsDemo.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

class FormsDemo extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            portraitURL: '',
            birthday: null,
            sex: true,
            about: ''
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePortraitURLChange = this.handlePortraitURLChange.bind(this);
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
        this.handleSexChange = this.handleSexChange.bind(this);
        this.handleAboutChange = this.handleAboutChange.bind(this);
       
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event){
        const {name, value} = event.target;  
        this.setState({
            [name]: value
        })
    }
        
    
    handlePortraitURLChange(event){
        const {name, value} = event.target;  
        this.setState({
            [name]: value
        })
    }
        
    
    handleBirthdayChange(date){
        console.log(date);
        this.setState({
            birthday: date
        });
    }
        
    
    handleSexChange(event){
       const {name, value} = event.target; 
        this.setState({
            [name]: value == true
        })
    }
        
    
    handleAboutChange(event){
        const {name, value} = event.target; 
        this.setState({
            [name]: value
        })
    }
   
    

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state)
        alert(`Name entered is ${this.state.name}`);
    }

    checkIfFormValid = () => {
        console.log('checkIfFormValid');
    }

    render(){
        let maleSexClassList = ["btn", "btn-primary"];
        let femaleSexClassList = [...maleSexClassList];
        if(this.state.sex){
            maleSexClassList = [...maleSexClassList, 'active'];
        }else{
            femaleSexClassList = [...femaleSexClassList, 'active']
        }
        return(
            <React.Fragment>
                <h1> Inside React FormsDemo Component </h1>
                <div className="container">
                    <form id="addFunForm">
                        <div className="modal-body">
                            <div className="form-group">
                            <label className={classes.left} htmlFor="nameInput">Name:</label>
                            <input type="text" name="name" value={this.state.name} className="form-control" onChange={this.handleNameChange} onKeyUp={this.checkIfFormValid} id="nameInput" maxLength="20" placeholder="Enter Name" required />
                            </div>
                            <div className="form-group">
                                <label className={classes.left} htmlFor="portraitURLInput">Portrait URL:</label>
                                <input type="text" value={this.state.portraitURL} name="portraitURL" className="form-control" onChange={this.handlePortraitURLChange} onKeyUp={this.checkIfFormValid} id="portraitURLInput" maxLength="255" placeholder="Enter Portrait URL" required/>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6 mb-2 date" data-provide="datepicker">
                                    <label className={[classes.left, classes.w100].join(' ')} style={{textAlign: "initial"}} htmlFor="sex">Birthday:</label>
                                    <div className="input-group-addon " style={{textAlign: "initial"}}>
                                        <DatePicker onChange={this.handleBirthdayChange}  selected={this.state.birthday ? this.state.birthday : null}/>
                                    </div>
                                </div>
                                <div className="form-group col-md-6 mb-2">
                                    <label className={[classes.left, classes.w100].join(' ')} htmlFor="sex">Sex:</label>
                                    <div className="btn-group btn-group-toggle" onChange={this.handleSexChange}  data-toggle="buttons">
                                        <label className={maleSexClassList.join(' ')} id="sexMale">
                                        <input type="radio" value={true}  name="sex" /> M
                                        </label>
                                        <label className={femaleSexClassList.join(' ')} id="sexFemale">
                                        <input type="radio" value={false} name="sex" /> F
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                            <label className={[classes.left].join(' ')} htmlFor="aboutInput">About:</label>
                            <textarea className="form-control" value={this.state.about} name="about" onChange={this.handleAboutChange} onKeyUp={this.checkIfFormValid} placeholder="Tell us about you..." id="aboutInput" rows="3" required></textarea>
                            <small className={classes.left} >This is your chance to tell us more about yourself.</small>
                            </div>
                            <div className={["form-group", classes.hidden].join(' ')} id="portraitURLError" >
                            <small style={{color: '#f00'}}>Please enter a valid Portrait URL</small>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" form="addFunForm" onClick={this.handleSubmit} className="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default FormsDemo;