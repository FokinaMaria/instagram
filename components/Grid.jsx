import React, { Component } from 'react';
import Tape from './Tape';

import { getUsers } from 'source';


class Grid extends Component {
  state = {
    gallery: []
  };

  componentDidMount() {
    getUsers()
      .then(({ data }) => this.setState({ gallery: data }))
  }

  render() {
    const { gallery } = this.state;

    return (
      <div className="grid">
        {gallery.map(data => {
          return <Tape data={data} key={data.id} />;
        })}
      </div>
    );
  }
}
export default Grid;
