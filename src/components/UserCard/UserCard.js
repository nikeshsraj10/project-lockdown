import React from 'react';
import classes from './UserCard.module.css';

const  UserCard = (props) => {
    return (
        <div key={props.user._id} className={["card", "m-1", "p-1", classes['user-card']].join(' ')}
             style={{width: '15rem', height:'25rem'}} onClick={() => props.click(props.user._id)}> 
            <div className="h-100">
                <img src={props.user.portraitURL ? props.user.portraitURL : 'https://i.imgur.com/hES7D98.jpeg'} 
                    className="w-100 card-img-top" alt="User" style={{maxHeight: '15rem'}}/>
                <div className="card-body">
                    <h5 className="card-title">{props.user.firstName} {props.user.lastName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.user.email}</h6>
                    <p className="card-text">Mobile: {props.user.mobile}</p>
                    <p className="card-text">Gender: {props.user.gender === 1 ? 'Male' : 
                                                    props.user.gender === 0 ? 'Female': 'Unspecified'}</p>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
