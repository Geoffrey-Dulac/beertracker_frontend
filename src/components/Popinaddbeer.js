import React from 'react';
import Popinbackground from './Popinbackground';
import Popin from './Popin';

function Popinaddbeer(props) {
    const datas = {name: 'Choisissez votre bière', user_grade: 'Quelle note lui attribueriez-vous ?'}
    return (
        <div>
            <Popinbackground />
            <Popin elements={datas}/>
        </div>
    );
}

export default Popinaddbeer;