import React, { Component } from 'react';
import "./example.css";

export default class Example extends Component {
  render() {
    return (
        <div className='main-styles'>
        <h2 className='title-styles'>{this.props.title}</h2>
        <div className='children-styles'>
            {this.props.children}
        </div>
      </div>
    );
  }
}