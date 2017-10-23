import React , { Component } from 'react';
import { Button } from './Button';

export class GameBoard extends Component{


	constructor(props) {
		super(props);
		this.state = {
			blink : 0,
			isClickable : false,
			correctClicks : 0 ,
			randomArrString : [],
			currentCount : 0
		}
	}



	componentWillReceiveProps(nextProps) {

		if(nextProps.gameState==="off" || nextProps.gameState==="won"){
			this.setState({
				blink : 0,
				isClickable : false,
				correctClicks : 0
			});
		}else if(nextProps.gameState==="playing" && nextProps.updateGameBoard){
			
			this.setState({
				blink : 0,
				isClickable : false,
				randomArrString : nextProps.randomArrString,
				currentCount : nextProps.currentCount,
				correctClicks : 0
			});
			
			this.blinkSimonButtons(nextProps);
		
		}
		
	}


	startClicking(){
		this.setState({
			blink : 0 ,
			isClickable : true
		});
	}

	

	blinkSimonButtons(nextProps){
		var randomArrString = nextProps.randomArrString;
		var i = 0;
		var interval = setInterval(function () {
			
			if(i===randomArrString.length){
				clearInterval(interval);
				this.startClicking();
			}


			/*desi jugad*/
			this.setState({
				blink : 0
			});
			setTimeout(function(){
				this.setState({
					blink : randomArrString[i]
				});
				i++;
			}.bind(this), 200);

			
			

		}.bind(this), 1200)
	}


	handleSimonButtonClick(pos){
		var correctClicks = this.state.correctClicks;
		if(pos === this.state.randomArrString[correctClicks]){
			correctClicks++;
			console.log('a');
			this.setState({
				correctClicks : correctClicks
			});
			if(correctClicks===this.state.currentCount){
				this.props.handleCorrectSimonSequence();
			}
		}else{
			this.props.handleIncorrectSimonSequence();
		}
	}


	render(){

		return (
				<div className="game-wrap">
					<div className="btn-line">
						<Button
							color = "green"
							border = "top-left"
							light = {this.state.blink===1 ? true : false}
							handleClick = {function(){
								this.handleSimonButtonClick(1);
							}.bind(this)}
							isClickable= {this.state.isClickable}
						/>
						<Button
							color = "red"
							border = "top-right"
							light = {this.state.blink===2 ? true : false}
							handleClick = {function(){
								this.handleSimonButtonClick(2);
							}.bind(this)}
							isClickable= {this.state.isClickable}

						/>
					</div>
					<div className="btn-line">
						<Button
							color = "yellow"
							border = "bottom-left"
							light = {this.state.blink===3 ? true : false}
							handleClick = {function(){
								this.handleSimonButtonClick(3);
							}.bind(this)}
							isClickable= {this.state.isClickable}

						/>
						<Button
							color = "blue"
							border = "bottom-right"
							light = {this.state.blink===4 ? true : false}
							handleClick = {function(){
								this.handleSimonButtonClick(4);
							}.bind(this)}
							isClickable= {this.state.isClickable}

						/>
					</div>
				</div>
			);
	}
}