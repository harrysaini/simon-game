import React , { Component } from 'react';
import { Button } from './Button';

export class GameBoard extends Component{

	render(){

		return (
				<div className="game-wrap">
					<div className="btn-line">
						<Button
							color = "green"
							border = "top-left"
						/>
						<Button
							color = "red"
							border = "top-right"
						/>
					</div>
					<div className="btn-line">
						<Button
							color = "yellow"
							border = "bottom-left"
						/>
						<Button
							color = "blue"
							border = "bottom-right"
						/>
					</div>
				</div>
			);
	}
}