import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'

class Map extends Component {

  render(){
    const { lat, lng } = this.props;
    return(
      <div>
        <GoogleMapLoader
          containerElement={ <div style={{height: 500, width: 500}} /> }
          googleMapElement={
              <GoogleMap defaultZoom={15} defaultCenter={{ lat, lng }} >
                 <Marker position={{ lat, lng }} />
              </GoogleMap>
            }
        />
        <p>Estou montando o mapa</p>
      </div>
    );
  }
}
export default Map