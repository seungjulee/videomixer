import React, { Component } from 'react';

export class YouTube extends Component {
  player = null;

  setPlayer = (ref) => {
    this.player = ref;
    // console.log(ref.);
  }

  render() {

    return (
      <iframe
        id="player"
        type="text/html"
        width="100%"
        height="100%"
        src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1"
        frameBorder="0"
        ref={this.setPlayer}
      >
      </iframe>
    )
  }
}
