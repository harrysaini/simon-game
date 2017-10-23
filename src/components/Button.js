import React , { Component } from 'react';


export class Button extends Component{


	render(){

		var classNames = "push-btn inline " + (!this.props.isClickable ? " no-click " : "" ) + (this.props.light ? " light " : "" ) + 
						  this.props.color + " " + this.props.border ; 
		
		return (
			<div className={classNames} onClick = {this.props.handleClick }>

			</div>

			);
	}
}