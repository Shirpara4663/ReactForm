import React, { Component } from 'react';
import "./example.css";

export default class Example extends Component {
  render() {
    return (
        <div style={{ paddingTop: '102px'}}>
        <h2 style={{font: 'Lato', fontSize: '20px', fontWeight: '700', lineHeight: '30px' }}>{this.props.title}</h2>
        {this.props.children}
      </div>
    );
  }
}