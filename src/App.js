import './scss/app.scss';
import React from 'react';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import Homepage from './pages/Homepage';
import BeersRankingpage from './pages/BeersRankingpage';
import { Switch, Route, withRouter } from "react-router-dom";


const App = () => {
	return (
		<div className='app'>
			<Switch>
				<Route exact path="/" component={withRouter(Loginpage)} />
				<Route exact path="/login" component={withRouter(Loginpage)} />
				<Route exact path="/signup" component={withRouter(Signuppage)} />
				<Route exact path="/home" component={withRouter(Homepage)} />
				<Route exact path="/beers_ranking" component={withRouter(BeersRankingpage)} />
			</Switch>
    	</div>
  	);
}

export default App;
