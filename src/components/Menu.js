import React from 'react';
import { Link } from "react-router-dom";

function Menu() {
    function handleClick(e) {
        document.querySelector('.hamburger hr:nth-child(1)').classList.toggle('rotate-first-HR');
        document.querySelector('.hamburger hr:nth-child(2)').classList.toggle('rotate-second-HR');
        document.querySelector('.hamburger hr:nth-child(3)').classList.toggle('rotate-third-HR');
        document.querySelector('.menu-items').classList.toggle('display-menu-items');
    }
    
    const handleSignout = () => {
        localStorage.setItem('token', '');
    }

    return (
        <div>        
            <div className='hamburger' onClick={(e) => handleClick(e)}>
                <hr/>
                <hr/>
                <hr/>
            </div>
            <div className='menu-items'>
                <div>
                    <Link to="/"><p className='text-dark mt-2' onClick={handleSignout}>Se déconnecter</p></Link>
                </div>
            </div>
        </div>
    );
}

export default Menu;