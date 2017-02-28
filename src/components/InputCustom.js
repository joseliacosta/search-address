import React, {Component} from 'react';

export default class InputCustom extends Component {

  render() {
    return(
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input className="form-control"
          {...this.props}
        />
      </div>
    );
  }
}