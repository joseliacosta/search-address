import React, { Component } from 'react';

export default class ButtonCustom extends Component {
  render() {
    return(

        <button type="submit"
                className="btn btn-primary">
          {this.props.value}
        </button>

    );
  }
}