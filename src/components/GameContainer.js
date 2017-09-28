import React from 'react';
import { Game } from './Game';
import { SelectGameType } from './SelectGameType';
import { SelectGameSymbol } from './SelectGameSymbol';
import { calculateNextMove } from '../helpers/nextMove';
import { calculateWinner } from '../helpers/resultCalc';
import { SelectFirstTurn } from './SelectFirstTurn';
import '../helpers/protoTypeMethods';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export class GameContainer extends React.Component{
	
	constructor(props) {
		super(props);
		this.state={
			square : [[null,null,null],[null,null,null],[null,null,null]],
			currentSymbol : "",
			gameState : "select-game-type",
			isFinished : false,
			isTied : false,
			playerOneSymbol : "",
			playerTwoSymbol : "",
			playerOneScore : 0,
			playerTwoScore : 0,
			gameType : '',
			currentPlayer : '',
			winner : '',
			winSquares : null,
			isAICalculating : false

		};
		this.handleSquareClick = this.handleSquareClick.bind(this);
		this.handleGameTypeSelect = this.handleGameTypeSelect.bind(this);
		this.handleGameSymbolSelect = this.handleGameSymbolSelect.bind(this);
		this.handleResetClick = this.handleResetClick.bind(this);
		this.handleFirstTurnSelect = this.handleFirstTurnSelect.bind(this);
	}



	findWinner(symbol){
		if(this.state.playerOneSymbol===symbol){
			return 'playerOne';
		}
		else{
			return 'playerTwo';
		}
	}


	/*
	*Restart game
	*/
	startNewGame(){
		setTimeout(function(){
			this.setState({
				square : [[null,null,null],[null,null,null],[null,null,null]],
				gameState : "game-to-start",
				isFinished : false,
				isTied : false,
				winner : '',
				winSquares : null,
				isAICalculating : false
			});

		}.bind(this) , 3000 );
	}


	/*
	*Function to play computers part
	*/
	playComputerPart(){
		var square,
		result,
		nextMove;
		
		square = this.state.square.clone2DArray();
		
		nextMove = calculateNextMove(square , this.state.playerTwoSymbol );
		

		square[nextMove[0]][nextMove[1]] =  this.state.currentSymbol;
		result = calculateWinner(square);
		//console.log('c',result);

		//if game is tied return
		if(result.isFinished && result.isTied){
			this.setState({
				square :square,
				isTied : true,
				isFinished : true
			});

			this.startNewGame();
			return;
		}

		if(result.isFinished){
			this.handleGameFinish(square , result );
		}else{
			this.setState({
				isAICalculating : false,
				square : square,
				currentSymbol : (this.state.currentSymbol==="X") ? "0" : "X",
				currentPlayer : this.state.currentPlayer === "playerOne" ? "playerTwo" : "playerOne"
			});

		}
	}

	/*
	*Function to handle game 
	*/
	handleGameFinish(square , result ){
		this.setState({
			gameState : "finished",
			isFinished : true,
			winner : this.findWinner(result.winSymbol),
			playerOneScore : this.findWinner(result.winSymbol)==='playerOne' ? this.state.playerOneScore + 1 : this.state.playerOneScore,
			playerTwoScore : this.findWinner(result.winSymbol)==='playerTwo' ? this.state.playerTwoScore + 1 : this.state.playerTwoScore,
			square : square,
			winSquares : result.winSquares
		});

		this.startNewGame();
	}

	/*
	*handle reset btn click
	*/
	handleResetClick(){
		this.setState({
			square : [[null,null,null],[null,null,null],[null,null,null]],
			currentSymbol : "",
			gameState : "select-game-type",
			isFinished : false,
			isTied : false,
			playerOneSymbol : "",
			playerTwoSymbol : "",
			playerOneScore : 0,
			playerTwoScore : 0,
			gameType : '',
			currentPlayer : '',
			winner : '',
			winSquares : null

		});
	}

	/*
	* Handle click on square
	*/
	handleSquareClick(i,j){
		var square,
		result;
		square = this.state.square.clone2DArray();

		if(square[i][j]){
			return ;
		}

		square[i][j] =  this.state.currentSymbol;

		result = calculateWinner(square);
		
		//if game is tied return
		if(result.isFinished && result.isTied){
			this.setState({
				square : square,
				isTied : true,
				isFinished : true
			});

			this.startNewGame();
			return;
		}
		
		if(result.isFinished){

			this.handleGameFinish(square , result );

		}else{
			this.setState({
				square : square,
				currentSymbol : (this.state.currentSymbol==="X") ? "0" : "X",
				currentPlayer : this.state.currentPlayer === "playerOne" ? "playerTwo" : "playerOne"
			});

			if(this.state.gameState==="game-is-on" && this.state.gameType==="computer" && !this.state.isFinished && !this.state.isTied){			
				this.setState({
					isAICalculating :  true
				});
				setTimeout(function(){
					this.playComputerPart();
				}.bind(this) , 200);
			}

		}
		
	}


	// componentDidUpdate(prevProps, prevState) {
	// 	if(this.state.gameState==="game-is-on" && this.state.gameType==="computer" && this.state.currentPlayer==="playerTwo" && !this.state.isFinished && !this.state.isTied){			
	// 		setTimeout(function(){
	// 			this.playComputerPart();
	// 		}.bind(this) , 200);
	// 	}
	// }


	/*
	* Handle game type select
	*/
	handleGameTypeSelect(type){
		if(type==='computer'){
			this.setState({
				gameState : "select-game-symbol",
				gameType : 'computer'
			});
		}else if(type==='player'){
			this.setState({
				gameState : "select-game-symbol",
				gameType : 'player'
			});
		}
	}


	/*
	* Handle game  symbol select
	*/
	handleGameSymbolSelect(symbol){
		if(symbol==="X"){
			
			this.setState({
				gameState : "game-to-start",
				playerOneSymbol : "X",
				playerTwoSymbol : "0",
			});

		}else if(symbol==="0"){
			
			this.setState({
				gameState : "game-to-start",
				playerOneSymbol : "0",
				playerTwoSymbol : "X",
			});
		}
	}


	/*
	* handle fisrt turn select
	*/
	handleFirstTurnSelect(player){
		this.setState({
			gameState : "game-is-on",
			currentPlayer : player,
			currentSymbol : player==='playerOne' ? this.state.playerOneSymbol : this.state.playerTwoSymbol
		});


		if(this.state.gameType==="computer" && player==="playerTwo" && !this.state.isFinished && !this.state.isTied){			
			this.setState({
				isAICalculating :  true
			});
			setTimeout(function(){
				this.playComputerPart();
			}.bind(this) , 400);
		}
	}
	



	render(){
		//console.log('main-render');

		var displayedComponents;

		if(this.state.gameState==="select-game-type"){
			
			displayedComponents = (				
				<SelectGameType
				handleGameTypeSelect={this.handleGameTypeSelect}
				key = "select-game-type"
				/>
				);

		}else if(this.state.gameState==="select-game-symbol"){
			
			displayedComponents = (
				<SelectGameSymbol 
				key="select-game-symbol"
				handleGameSymbolSelect ={this.handleGameSymbolSelect}
				/>	
				);
		}
		
		if(this.state.gameState==="game-to-start"){
			displayedComponents = (
				<SelectFirstTurn
				key="select-first-turn"
				gameType={this.state.gameType}
				handleFirstTurnSelect={this.handleFirstTurnSelect}
				/>
				);
		}

		if(this.state.gameState==="game-is-on"||this.state.gameState==="finished"){
			
			displayedComponents = ( 
				<Game 
				playerOneScore={this.state.playerOneScore}
				playerTwoScore={this.state.playerTwoScore}
				isFinished={this.state.isFinished}
				isTied={this.state.isTied}
				winSquares={this.state.winSquares}
				winner={this.state.winner}
				square={this.state.square}
				onSquareClick={this.handleSquareClick}
				gameType={this.state.gameType}
				currentPlayer={this.state.currentPlayer}
				isAICalculating={this.state.isAICalculating}
				handleResetClick={this.handleResetClick}
				/>
				);
		}

		return (
			<div>

			{displayedComponents}

			</div>

			);
	}
}

// <ReactCSSTransitionGroup
// 					transitionName="fade"
// 					transitionAppear={true}
// 					transitionAppearTimeout={700}
// 					transitionEnterTimeout={700}
// 					transitionLeaveTimeout={700}
// 				>
// 				</ReactCSSTransitionGroup>