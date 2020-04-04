import React, {Component} from 'react';
import axios from 'axios';

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
                <h1>Inside UsersList COmponent</h1>
                <ul>
                    {this.state.users.map((user, index) => {
                        return <li key={user.id}>{user.firstName} {user.email }</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default UsersList;