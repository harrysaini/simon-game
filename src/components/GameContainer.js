import React , { Component } from 'react';
import { GameBoard } from './GameBoard';
import { Controller } from './Controller';
import { getRandomStringArray } from '../helpers/getRandomVal'

export class GameContainer extends Component{

	constructor(props) {
		super(props);
		this.state = {
			isON : false,
			isStrict : false,
			randomArray : [],
			currentCount :  1,
			countString : '--',
			gameState : 'off',
			updateGameBoard : false

		}

		this.handlePowerToggle = this.handlePowerToggle.bind(this)
		this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
		this.handleCorrectSimonSequence = this.handleCorrectSimonSequence.bind(this);
		this.handleIncorrectSimonSequence = this.handleIncorrectSimonSequence.bind(this);
		this.handleStopButtonClick = this.handleStopButtonClick.bind(this);
		this.handleStrictModeToggle = this.handleStrictModeToggle.bind(this);
	}

	startPower(){
		this.setState({
			isON : true 
		});
	}


	stopPower(){
		this.resetGameState()
	}

	resetGameState(){
		this.setState({
			isON : false,
			isStrict : false,
			randomArray : [],
			currentCount :  1,
			countString : '--',
			gameState : 'off',
			updateGameBoard : false
		});
	}


	startGame(){
		var randomArray =  getRandomStringArray();
		this.setState({
			randomArray : randomArray,
			gameState : 'playing',
			currentCount : 1,
			countString : this.getFormattedCountString(1),
			updateGameBoard : true
		});
	}

	stopGame(){
		this.setState({
			randomArray : [],
			currentCount :  1,
			countString : '--',
			gameState : 'off',
			updateGameBoard : false	
		});
	}

	getFormattedCountString(count){
		if(count < 9){
			return '0'+count;
		}else{
			return count ;
		}
	}

	handlePowerToggle(value){
		if(value){
			this.startPower();
		}else{
			this.stopPower();
		}
	}

	handleStrictModeToggle(value){
		this.setState({
			isStrict : value,
			updateGameBoard : false
		});
	}

	handleStartButtonClick(){
		if(this.state.isON){
			this.startGame();
		}
	}

	handleStopButtonClick(){
		this.stopGame();
	}


	handleCorrectSimonSequence(){
		var currentCount = this.state.currentCount + 1 ;
		if(this.state.currentCount===2){
			this.setState({
				gameState : 'won'
			});
		}else{

			this.setState({
				currentCount : currentCount,
				countString : this.getFormattedCountString(currentCount)
			});	
		}
		
		
	}


	continueAfterWrongSequence(){
		this.setState({
			countString : this.getFormattedCountString(this.state.currentCount),
			updateGameBoard :  true
		});
	}



	handleIncorrectSimonSequence(){
		this.setState({
			countString : "!!",
			updateGameBoard : false
		});

		setTimeout(function(){
			if(this.state.isStrict){
				this.startGame();
			}else{
				this.continueAfterWrongSequence();
			}
			

		}.bind(this),1000);

	}


	render(){

		return (
			<div className="wrap">
				<div className="game-wrap-main">
					<GameBoard
						gameState = {this.state.gameState}
						randomArrString = {this.state.randomArray[this.state.currentCount - 1]}
						currentCount = {this.state.currentCount}
						handleCorrectSimonSequence = {this.handleCorrectSimonSequence}
						handleIncorrectSimonSequence = {this.handleIncorrectSimonSequence}
						updateGameBoard= {this.state.updateGameBoard}
					 />
				</div>
				<Controller 
					handlePowerToggle = {this.handlePowerToggle}
					countString = {this.state.countString}
					isON = {this.state.isON}
					handleStartButtonClick = {this.handleStartButtonClick}
					handleStopButtonClick = {this.handleStopButtonClick}
					handleStrictModeToggle = {this.handleStrictModeToggle}
					gameState = {this.state.gameState}
				/>
			</div>

			);
	}
}