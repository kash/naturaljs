import React from 'react';
import Tag from '../../nlp/tags';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			tags: null,
			loaded: false
		}
	}

	componentWillMount(){
		new Tag(function(tag, timeToLoad){
			this.setState({
				tags: tag,
				loaded: true
			})
		}.bind(this));
	}

	handleChange(e) {
		let tag = this.state.tags;
		tag.updateValue(e.target.value);
		this.setState({
			tags: tag
		});
		console.log(this.state.tags.capatalize());
	}

	render() {
		if (this.state.loaded){
			return (
				<div>
					Hi
					<input type="text"
						   value={this.state.tags.value}
						   onChange={(e) => this.handleChange(e)}/>
				</div>
			)
		}else{
			return null;
		}
	}
}