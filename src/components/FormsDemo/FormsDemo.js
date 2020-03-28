import React, {Component} from 'react';
import classes from './FormsDemo.module.css';

class FormsDemo extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        alert(`Name entered is ${this.state.value}`);
    }

    render(){
        return(
            <React.Fragment>
                <h1> Inside React FormsDemo Component </h1>
                <form onSubmit={this.handleSubmit}>
                    <label >
                        Name:
                    <input type="text" name="name" value={this.state.value} onChange = {this.handleChange}/>
                    </label>
                    <input  type="submit" value="Submit" />
                </form>
            </React.Fragment>
        )
    }
}

export default FormsDemo;