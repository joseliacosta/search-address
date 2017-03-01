import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'



class AddressInfo extends Component {
  render(){
    const { lat, lng, endereco } = this.props;

    return(

      <div className="panel panel-default">
        <div className="panel-heading">
          <a href="#" onClick={this.props.handleClose}>
            <i className="glyphicon glyphicon-remove-circle pull-right"></i>
          </a>
          <address>
            <strong>{endereco.logradouro}</strong><br/>
            {endereco.bairro}<br/>
            {endereco.localidade} - {endereco.uf}<br/>
            {endereco.cep}
          </address>
        </div>
        <div className="panel-body">
          <GoogleMapLoader
            containerElement={ <div style={{height: 500, width: '100%'}} /> }
            googleMapElement={
              <GoogleMap defaultZoom={15} center={{ lat: Number(lat), lng: Number(lng)}} >
                 <Marker position={{ lat, lng }} />
              </GoogleMap>
            }
          />
        </div>
      </div>
    );
  }
}

export default AddressInfo