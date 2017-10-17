import React , { Component } from 'react';
import {GameContainer} from './GameContainer';

export class App extends Component{
	
	render(){
		return (
			<div>
				<div className='main-container'>
					<GameContainer />
				</div>
				
				<div className="credits">
					inspired by punnu sir the great
					<br/>
					built by  harish
					
				</div>
			</div>
		);
	}
}