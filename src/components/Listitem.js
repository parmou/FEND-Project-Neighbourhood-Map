import React, { Component } from 'react'

class Listitem extends Component {

    render() {

        return (
            <div role="button"  tabIndex="0" className="listItem" onClick={() => this.props.onListItemClick(this.props)}>
             <h6 className="card-title pointer font-weight-bold">
                {this.props.name}
           </h6>
           <hr/>
          </div>
        );
    }
}

export default Listitem