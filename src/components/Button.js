import React , { Component } from 'react';


export class Button extends Component{

	render(){

		var classNames = "push-btn inline " + this.props.color + " " + this.props.border ; 
		
		return (
			<div className={classNames}>

			</div>

			);
	}
}