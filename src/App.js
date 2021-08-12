import './scss/app.scss';
import React from 'react';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import { Switch, Route, withRouter } from "react-router-dom";


const App = () => {
	return (
		<div className='app'>
			<Switch>
				<Route path="/" component={Loginpage} />
				<Route path="/login" component={Loginpage} />
				<Route path="/signup" component={Signuppage} />
			</Switch>
    	</div>
  	);
}

export default App;
