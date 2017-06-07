import React from 'react';
import {Link} from 'react-router';

export default class App extends React.Component {
	constructor() {
		super();

	}

	render() {
		return (
			<div className="app-layout">
				<div className="app-navigation">
					<div>
						<ul>
							<li><a href="/calculator">This is a test</a></li>
							<li><a href="/calculator">This is a test</a></li>
						</ul>
					</div>
				</div>
				<main>
					{this.props.children}
				</main>
			</div>
		)
	}
}