import React, { Component } from 'react'
import Listitem from './Listitem'

class List extends Component{

	render(){
		return(

				<div className="accordion pl-3" id="accordionList">
				  <div className="card mb-3">
				    <div id="listItem1" className="card-body">
				      {this.props.venues &&
				        this.props.venues.map((venue, index) => (
				          <Listitem key={index} {...venue} onListItemClick={this.props.onListItemClick} />
				        ))}
				    </div>
				  </div>
				</div>
			);
	}
}

export default List