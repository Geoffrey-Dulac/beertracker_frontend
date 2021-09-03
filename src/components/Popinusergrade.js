import React from 'react';
import Popinbackground from './Popinbackground';
import Popin from './Popin';

function Popinusergrade(props) {
    const datas = {user_grade: 'Quelle note voulez-vous attribuer à cette bière ?'}

    return (
        <div>
            <Popinbackground />
            <Popin url_request='http://localhost:8000/edit_or_create_usergrade' elements={datas}
                handleAlertSuccess={() => props.handleAlert({message: 'Note ajoutée/modifiée avec succès', class:'alert-success'})} 
                handleAlertWarning={(obj) => props.handleAlert(obj)}
                usergradeSaved={props.usergradeSaved} handleClosePopin={props.handleClosePopin} 
                beername={props.beername} handleClosePopin={props.handleClosePopin}/>
        </div>
    );
}

export default Popinusergrade;