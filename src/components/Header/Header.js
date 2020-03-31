import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.min.js'; 
import classes from './Header.module.css';

const Header = (props) => (
    <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">User List</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
        
            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link to="/" className="nav-link"><div className={classes.left}>Home</div><span className="sr-only">(current)</span></Link>
                </li>
                {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div className="dropdown-menu" aria-labelledby="dropdown01">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>
                </li> */}
            </ul>
            <form className="form-inline my-2 my-lg-0" style={{marginRight: '0px'}}>
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
            <div id="addUserButton">
                <Link to="/createUser" className={["btn", "btn-primary", classes.left].join(' ')}>Add User</Link>
            </div>
            </div>
    </nav>
  </React.Fragment>
);

export default Header;