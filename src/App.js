import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import InputCustom from './components/InputCustom';
import ButtonCustom from './components/ButtonCustom';
import Map from './components/Map';

class App extends Component {
  constructor() {
    super();
    this.setCep = this.setCep.bind(this);
    this.setRua = this.setRua.bind(this);
    this.setBairro = this.setBairro.bind(this);
    this.setCidade = this.setCidade.bind(this);
    this.setEstado = this.setEstado.bind(this);
    this.enviaForm = this.enviaForm.bind(this);
    this.callback = this.callback.bind(this);

    this.state = {cep: '', endereco:[], location:[], lat:[], lng:[]};

  }

  setCep(event) {
      this.setState({cep: event.target.value});
  }

  setRua(event) {
    this.setState({rua: event.target.value});

  }

  setBairro(event){
    this.setState({bairro: event.target.value});

  }

  setCidade(event){
    this.setState({localidade: event.target.value});

  }

  setEstado(event){
    this.setState({uf: event.target.value});
  }


  enviaForm(event) {

    event.preventDefault();


    $.getJSON({
      url: 'https://viacep.com.br/ws/' + this.state.cep + '/json/?callback=callback ',
      dataType:'jsonp',
      data: JSON.stringify({
        cep:this.state.cep,
        logradouro:this.state.logradouro,
        bairro: this.state.bairro,
        localidade:this.state.localidade,
        uf: this.state.uf
      }),

      success: function(data){
        this.callback(data);
      }.bind(this),
      error: function(response){
        console.log(response);
      }
    });
  }

  callback(result){
    this.setState({endereco: result} );
    console.log(result);
   $.ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+result.logradouro+'-'+result.bairro+'-'+result.localidade,
      success: function(data){
        console.log("Latitude: " + data.results[0].geometry.location.lat + " Longitude: " + data.results[0].geometry.location.lng);
        this.setState({lat: data.results[0].geometry.location.lat});
        this.setState({lng: data.results[0].geometry.location.lng});


      }.bind(this),
      error: function(error){
        console.log(error);

      }
    });

  }


  render() {


    return (

      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <h1>Consulta de endereço</h1>
            <div className="well">
              <h2>Consultar</h2>
              <form className="form-inline" onSubmit={this.enviaForm}>

               <InputCustom label="CEP"
                      id="cep"
                      type="text"
                      name="cep"
                      placeholder="00000-000"
                      value={this.state.cep}
                      onChange={this.setCep}
               />
                <ButtonCustom value="Buscar"></ButtonCustom>
              </form>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <a href="">
                  <i className="glyphicon glyphicon-remove-circle pull-right"></i>
                </a>

                <address>
                  <strong>{this.state.endereco.logradouro}</strong><br/>
                  {this.state.endereco.bairro}<br/>
                  {this.state.endereco.localidade} - {this.state.endereco.uf}<br/>
                  {this.state.endereco.cep}
                </address>


              </div>

              <div className="panel-body">

                <p id="lat">{parseFloat(this.state.lat)}</p>
                <p id="lng">{parseFloat(this.state.lng)}</p>

                <Map lat={parseFloat(this.state.lat)} lng={parseFloat(this.state.lng)} />
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

}
export default App;
