import React from 'react';
import classes from './UserCard.module.css';

class  UserCard extends React.Component {
    
    render(){
        return (
            <div className={["card", "m-1", "p-1", classes['user-card']].join(' ')}
                 style={{width: '15rem', height:'25rem'}} onClick={() => this.props.click(this.props.user._id)}> 
                <div className="h-100">
                    <img src={this.props.user.portraitURL ? this.props.user.portraitURL : 'https://i.imgur.com/hES7D98.jpeg'} 
                        className="w-100 card-img-top" alt="User" style={{height: '15rem'}}/>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.user.firstName} {this.props.user.lastName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{this.props.user.email}</h6>
                        <p className="card-text">Mobile: {this.props.user.mobile}</p>
                        <p className="card-text">Gender: {this.props.user.gender === 1 ? 'Male' : 
                                                        this.props.user.gender === 0 ? 'Female': 'Unspecified'}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserCard;
