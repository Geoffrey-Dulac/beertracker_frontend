import React from 'react';
import Popinbackground from './Popinbackground';
import Popin from './Popin';

function Popinusergrade(props) {
    const datas = {user_grade: 'Quelle note voulez-vous attribuer à cette bière ?'}
    let api_url;
    if (process.env.NODE_ENV === 'development') {
        api_url = 'http://localhost:8000/'
    } else if (process.env.NODE_ENV === 'production') {
        api_url = 'https://beertracker-api.herokuapp.com/'
    }

    return (
        <div>
            <Popinbackground />
            <Popin url_request={api_url + 'edit_or_create_usergrade'} elements={datas}
                handleAlertSuccess={() => props.handleAlert({message: 'Note ajoutée/modifiée avec succès', class:'alert-success'})} 
                handleAlertWarning={(obj) => props.handleAlert(obj)}
                usergradeSaved={props.usergradeSaved} handleClosePopin={props.handleClosePopin} 
                beername={props.beername} handleClosePopin={props.handleClosePopin}/>
        </div>
    );
}

export default Popinusergrade;