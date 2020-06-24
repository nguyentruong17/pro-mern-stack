import React from 'react';

const NavBar = props => {
    return(
        <nav> 
            <a href='/'>Home</a>
            {' | '}
            <a href='/#/issues'>Issues</a>
            {' | '}
            <a href='/#/report'>Report</a>
            {' | '}
        </nav>
    )
}

export default NavBar;