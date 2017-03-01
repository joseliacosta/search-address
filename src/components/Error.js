import React, { Component } from 'react';

class Error extends Component {
  render() {
    return(
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="alert alert-danger" role="alert">Ops! Não achei esse cep. :(</div>
        </div>
      </div>
    );
  }
}
export default Error