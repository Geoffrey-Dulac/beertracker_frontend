import React from 'react';
import { Link } from "react-router-dom";

function Menu(e) {
    function handleClick(e) {
        document.querySelector('.hamburger hr:nth-child(1)').classList.toggle('rotate-first-HR');
        document.querySelector('.hamburger hr:nth-child(2)').classList.toggle('rotate-second-HR');
        document.querySelector('.hamburger hr:nth-child(3)').classList.toggle('rotate-third-HR');
        document.querySelector('.background-menu').classList.toggle('display-background-menu');
        document.querySelector('.menu-items').classList.toggle('display-menu-items');
    }

    return (
        <div>        
            <div className='hamburger' onClick={(e) => handleClick(e)}>
                <hr/>
                <hr/>
                <hr/>
            </div>
            <div className='background-menu'></div>
            <div className='menu-items'>
                <Link to="/"><p className='text-dark mt-2'>Page 1</p></Link>
                <Link to="/"><p className='text-dark mt-2'>Page 2</p></Link>
                <Link to="/"><p className='text-dark mt-2'>Page 3</p></Link>
                <Link to="/"><p className='text-dark mt-2'>Page 4</p></Link>
            </div>
        </div>
    );
}

export default Menu;