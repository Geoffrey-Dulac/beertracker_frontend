import React from 'react';

function Menu() {
    function handleClick() {
        console.log('click');
    }

    return (
        <div className='hamburger' onClick={handleClick}>
            <hr/>
            <hr/>
            <hr/>
        </div>
    );
}

export default Menu;