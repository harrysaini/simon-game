import React , { Component } from 'react';
import { ToggleBtn } from './ToggleBtn';


export class Controller extends Component{

	render(){

		return (
			<div className="control">
				<h1 className="logo">
					Simon
				</h1>
				<div className="btn-wrap">
					
					<div className="inline">
						<div className = "count-display">
							<div className="count">
								00
							</div>
						</div>
						<div className="label"> COUNT </div>
					</div>

					<div className="inline">
						<ToggleBtn />
						<div className="label"> POWER </div>
					</div>

					<div className="inline">
						<ToggleBtn />
						<div className="label"> STRICT </div>
					</div>
				</div>

				<div className="simple-btn green-btn">
					START
				</div>
			</div>

			);
	}
}