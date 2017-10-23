import React , { Component } from 'react';


export class ToggleBtn extends Component{

	constructor(props) {
		super(props);
		this.state = {
			isTrue : false
		};

		this.handleSwitchClick = this.handleSwitchClick.bind(this);
	}

	toggleSwitch(value){
		this.setState({
			isTrue : value
		});
	}

	handleSwitchClick(){
		var value = this.state.isTrue ? false : true ;
		this.toggleSwitch(value);
		this.props.handleSwitchClick(value);
	}

	render(){

		return (
			<div className="sw-slot little-up-left" onClick={this.handleSwitchClick}>
				<div className={"switch "+ (this.state.isTrue ? " sw-on" : "")}>
				</div>
			</div>

			);
	}
}