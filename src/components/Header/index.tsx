import * as React from 'react';
import './Header.scss'
import { Link } from 'react-router-dom';


const Header: React.FunctionComponent = () => {
  return (
    <nav className="navbar bg-primary navbar-dark border-bottom border-bottom--2 mb-2">
      <div className="container">
        <a className="logo text-hide" href="#">Navbar</a>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/positions" className="nav-link nav-link--white small font-weight-bolder" href="#">All jobs</Link>
          </li>
        </ul>
      </div>
    </nav >
  );
};

export default Header;