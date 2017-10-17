import React , { Component } from 'react';
import { GameBoard } from './GameBoard';
import { Controller } from './Controller';

export class GameContainer extends Component{

	render(){

		return (
			<div className="wrap">
				<div className="game-wrap-main">
					<GameBoard />
				</div>
				<Controller />
			</div>

			);
	}
}