import React from 'react';
import { NavLink } from 'react-router-dom'

const NavBar = props => {
    return(
        <nav> 
            <NavLink exact to='/'>Home</NavLink>
            {' | '}
            <NavLink to='/issues'>Issues</NavLink>
            {' | '}
            <NavLink to='/report'>Report</NavLink>
            {' | '}
        </nav>
    )
}

export default NavBar;