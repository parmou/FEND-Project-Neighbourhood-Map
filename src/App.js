import React, { Component } from 'react';
import './App.css';
import FoursqaureAPI from './API/FoursqaureAPI'
import Map from './components/Map';
import Placesbar from './components/Placesbar';
import ErrorBoundary from './components/ErrorBoundary'

class App extends Component {
    constructor() {
        super();
        this.state = {
            venues: [],
            markers: [],
            center: [],
            zoom: 14,
            updateSuperState: obj => {
                this.setState(obj);
            }
        };
    }

     /**
     * Close the InfoWindow on all the markers
     */
    onMarkerClickCloseAll = () => {
        const markers = this.state.markers.map(marker => {
            marker.isOpen = false;
            return marker;
        });

        this.setState({ markers: [...this.state.markers, markers] })
    };

     /**
     * Retrive the location data from the foursquare api for the marker and display it in the infowindow
     * @param {object} location marker
     */
    onMarkerClickOpen = (marker) => {
        this.onMarkerClickCloseAll();
        marker.isOpen = true;
        this.setState({ markers: [...this.state.markers, marker] })
    }

    
    /**
     * Retrive the location data from the foursquare api for the place which is clicked on in the list and display it in the infowindow
     * @param {object} venue
     */
    onListItemClick = (venue) => {
        const marker = this.state.markers.find(marker => marker.id === venue.id);
        this.onMarkerClickOpen(marker)
    }

    componentDidMount() {
        FoursqaureAPI.search().then(res => {
            const { venues } = res.response;
            const { center } = res.response.geocode.feature.geometry;
            const markers = venues.map(venue => {

                return {
                    lat: parseFloat(venue.location.lat),
                    lng: parseFloat(venue.location.lng),
                    isOpen: false,
                    isVisible: true,
                    id: venue.id
                }

            });

            this.setState({ venues, center, markers })
        })


    }

    render() {
        return (
            <main>
            <header id="title">
                 <h1>Welcome to the Neighborhood Map</h1>
                  <h2>This map shows Coffee Shops in New Delhi, India</h2>
           </header>
               <section>
                 <div className="row">
                 <ErrorBoundary>
                   <Placesbar {...this.state } onListItemClick = { this.onListItemClick }/>
                   <Map  {...this.state}
                     onMarkerClickOpen ={ this.onMarkerClickOpen}/>
                    </ErrorBoundary>
                 </div>
               </section>
             </main>
        );
    }
}

export default App;