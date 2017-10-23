import React , { Component } from 'react';
import { ToggleBtn } from './ToggleBtn';


export class Controller extends Component{

	render(){


		var btnJsx ;
		if(this.props.gameState==="off"){

			btnJsx = (
					<div className="simple-btn green-btn" onClick={this.props.handleStartButtonClick}>
						Start
					</div>
				);
		}else if(this.props.gameState==="playing"){
			btnJsx = (
					<div className="simple-btn red-btn" onClick={this.props.handleStopButtonClick}>
						Stop
					</div>
				);
		}else if(this.props.gameState==="won"){
			btnJsx = (
					<div className="simple-btn green-btn" onClick={this.props.handleStopButtonClick}>
						You won!!
					</div>
				);
		}

		return (
			<div className="control">
				<div className="logo">
					Simon
				</div>
				<div className="btn-wrap">
					
					<div className="inline">
						<div className ={"count-display "+( !this.props.isON ? " led-off" : "led-blink") }>
							<div className="count">
								{this.props.countString}
							</div>
						</div>
						<div className="label"> COUNT </div>
					</div>

					<div className="inline">
						<ToggleBtn 
							handleSwitchClick = {this.props.handlePowerToggle}
						/>
						<div className="label"> POWER </div>
					</div>

					<div className="inline">
						<ToggleBtn
							handleSwitchClick = {this.props.handleStrictModeToggle} 
						/>
						<div className="label"> STRICT </div>
					</div>
				</div>

				{btnJsx}
			</div>

			);
	}
}