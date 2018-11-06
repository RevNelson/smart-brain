import React from 'react';

const Navigation = ({onRouteChange, status}) => {
    return (
        status === false
        ? <nav className='center'>
                <p className='pa3 tr f3 link dim gray underline pointer' onClick={() => onRouteChange('signIn')}>Sign In</p>
                <p className='pa3 tr f3 link dim gray underline pointer' onClick={() => onRouteChange('register')}>Register</p>
            </nav> :
            <nav className='center'>
                <p className='pa3 tr f3 link dim gray underline pointer' onClick={() => onRouteChange('signOut')}>Sign Out</p>
            </nav>

    );
};

export default Navigation;