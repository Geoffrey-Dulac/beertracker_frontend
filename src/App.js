import './scss/app.scss';
import React from 'react';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import {	Switch, Route, withRouter } from "react-router-dom";


const App = () => {
	return (
		<div className='app'>
			<Switch>
				<Route exact path="/" component={withRouter(Loginpage)} />
				<Route exact path="/login" component={withRouter(Loginpage)} />
				<Route exact path="/signup" component={withRouter(Signuppage)} />
			</Switch>
    	</div>
  	);
}

export default App;
