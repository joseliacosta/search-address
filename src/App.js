import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import InputCustom from './components/InputCustom';
import ButtonCustom from './components/ButtonCustom';
import AddressInfo from './components/AddressInfo';
import Error from './components/Error';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cep: '',
      endereco:[],
      location:[],
      lat:[],
      lng:[],
      showingMap: false,
      showingError: false
    };
    this.enviaForm = this.enviaForm.bind(this);
    this.callback = this.callback.bind(this);
    this.closeMap = this.closeMap.bind(this);

  }

  handleChange(inputName,event){
    let handlingInput = {};
    handlingInput[inputName] = event.target.value;
    this.setState(handlingInput);
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
      error:(response) =>{
        if(response.status !== 200) {
          this.setState({showingError: true});

        }
      }
    });
  }

  callback(result){

    $.ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+result.logradouro+'-'+result.bairro+'-'+result.localidade,
      success: function(data){
        this.setState({
          endereco: result,
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
          showingMap:true,
          showingError: false

        });
      }.bind(this),
      error:(error)=> {
        if(error.status !== 200) {
          this.setState({showingError: true});

        }

      }
    });
  }

  closeMap() {
    this.setState({
      showingMap: false,
      showingError: false

    });
  }

  cleanup() {
    this.setState({cep: ''});

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
                             required
                             onChange={this.handleChange.bind(this,'cep')}
                />
                <ButtonCustom value="Buscar"></ButtonCustom>
              </form>

            </div>
            {
              this.state.showingError && <Error/>
            }


            {
              this.state.showingMap &&
                <AddressInfo endereco={this.state.endereco}
                             lat={this.state.lat}
                             lng={this.state.lng}
                             handleClose={() => { this.closeMap(); this.cleanup()} }

              />
            }

          </div>
        </div>
      </div>

    );
  }

}
export default App;
