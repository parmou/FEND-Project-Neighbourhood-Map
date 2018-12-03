/* global google */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
        <GoogleMap 
           defaultZoom={8} 
           zoom = { props.zoom }
           defaultCenter={{ lat:28.6329, lng:77.2195}} 
           center = {{
            lat: parseFloat(props.center.lat),
            lng: parseFloat(props.center.lng)
           } }
         >

    {props.markers &&   
      props.markers
      .filter(marker => marker.isVisible)
      .map((marker, index , array) => {

        const venueInfo = props.venues.find(
          venue => venue.id === marker.id);
        return(
                <Marker key={index}
                 position={{ lat: marker.lat , lng: marker.lng }}
                  onClick = { () => props.onMarkerClickOpen(marker)}
                 animation={
                   array.length === 1
                     ? google.maps.Animation.BOUNCE
                     : google.maps.Animation.DROP
                 }
                  >

                { marker.isOpen &&  (
                  <InfoWindow>
                   <div>
                   <p className="font-weight-bold">{venueInfo.name}</p>
                   <hr />
                   <p>
                     {venueInfo.location.formattedAddress[0]}
                     <br />
                     {venueInfo.location.formattedAddress[1]}
                   </p>
                  
                   </div>
                  </InfoWindow>
                  
                  )}

                </Marker>
                );
              })}
          </GoogleMap>

          ))
);


class Map extends Component {



    render() {

        return (
            <MyMapComponent 
           {...this.props}

             googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            loadingElement = { <div style={{ height: `100%`, width:`100%` }} />
        }
        containerElement = { <div id="map" className="col-12 col-sm-9 d-block" /> }
        mapElement = { <div className="d-flex" style={{ height: `100%` }} /> }
        />


    )
}
}

export default Map
