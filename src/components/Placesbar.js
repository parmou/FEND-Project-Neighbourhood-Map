import React, { Component } from 'react'
import List from './List'

class Placesbar extends Component {
    constructor() {
        super();
        this.state = {
            query: "",
            venues: []
        };
    }


    filterPlaces = () => {
        if (this.state.query.trim() !== "") {
            const venues = this.props.venues.filter(venue =>
                venue.name.toLowerCase().includes(this.state.query.toLowerCase())
            );
            return venues;
        }
        return this.props.venues;
    };

    filterPlacesMarker = event => {
        this.setState({ query: event.target.value });
        const markers = this.props.venues.map(venue => {
            const isMatched = venue.name.toLowerCase()
                .includes(event.target.value.toLowerCase());
            const marker = this.props.markers.find(marker => marker.id === venue.id);
            if (isMatched) {
                marker.isVisible = true
            } else {
                marker.isVisible = false
            }
            return marker;
        });
        this.props.updateSuperState({ markers })
    }

    render() {

        return (

            <div id="list" className= "Placesbar col-12 col-sm-3 d-lg-block">
            <h3  className="pt-3 pl-3"> Coffee Places near Delhi </h3>
            <div className="pl-3">
             <label className="sr-only" htmlFor="search">
            Search for a Coffee Shop
          </label>
            <input 
                className="form-control" 
                type={"search"} 
                id = {"search"}
                aria-describedby= {"Filter coffee places"}
                placeholder= {"Filter coffee places"}
                onChange = {this.filterPlacesMarker}/>
            </div>
            <List {...this.props} 
            venues = {this.filterPlaces()}
            onListItemClick = { this.props.onListItemClick }
            />
            </div>


        )
    }



}

export default Placesbar