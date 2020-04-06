import React, {Component} from 'react';
import axios from 'axios';
import UserCard from '../UserCard/UserCard';

class UsersList extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        this.getUsers();
    }

    handleCardClick = (userID) => {
        console.log(userID);
        //Helps navigating to /user path
        this.props.history.push({
            pathname: '/user',
            state: {'userID': userID}
        });
    }

    getUsers(){
        axios.get('http://localhost:5000/users/')
             .then((response) => {
                 this.setState({
                     users: response.data
                 })
             })
             .catch(err => {
                 console.log(err);
             })
    }
    render(){
       
        return(
            <div className="container">
                <div className="row">
                    {this.state.users.map(user => {
                        return <UserCard click={this.handleCardClick} user={user}/>
                    })}
                </div>
            </div>
        );
    }
}

export default UsersList;