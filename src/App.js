import React, { Component } from 'react';
import logo from './logo.svg';
import YouTube from 'react-youtube';
import './App.css';

const QUERY_URL_LENGTH = 100;

function youtubeParser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

class Grid extends Component {
  state = {
    query: '',
    hasClickedPlus: false,
    isVideoLoaded: false,
  }

  onInputChange = (e) => {
    const normalizedQuery = e.target.value.trim().substring(0, 100);
    this.setState({ query: normalizedQuery });
  }
  
  onLoadVideo = () => {
    if (youtubeParser(this.state.query)) {
      const videoId = youtubeParser(this.state.query);
      this.setState({ isVideoLoaded: true, videoId });
    }
  }
  
  onAddGrid = () => {
    this.setState({ hasClickedPlus: true });
    this.props.onAddGrid(this.state.videoId);
  }
  
  render() {
    const { videoOps, videoId } = this.props;
    
    let content;
    if (videoId) {
      content = (
        <YouTube videoId={videoId} ops={videoOps} />
      );
    }
    else if (this.state.isVideoLoaded) {
      content = (
        <YouTube videoId={this.state.videoId} ops={videoOps} />
      );
    } else if (this.state.hasClickedPlus) {
      content = (
        <div>
          <input type="text" onChange={this.onInputChange}/>
          <button className="btn" onClick={this.onLoadVideo}>
            <span>{ "Load" } </span>
          </button>
        </div>
      );
    } else {
      content = (
        <button className="btn" onClick={this.onAddGrid}>
          <span>{ "+" } </span>
        </button>
      );
    }
    
    return (
      <div className="grid">
        { content }
      </div>
    );
  }
}

const GRID_XY = 9;

class App extends Component {
  state = {
    queuedVideoIds: ['+'],
    activeGridNumber: 1,
  }
  
  addVideoWindow = () => {
    console.log(this.state)
  }
  
  onAddGrid = (videoId) => {
    this.setState(({ queuedVideoIds }) => ({
      queuedVideoIds: queuedVideoIds.length < GRID_XY ? [ ...queuedVideoIds, videoId ] : [ ...queuedVideoIds ],
    }))
  }

  render() {
    const videoOps = {
      width: '400',
      height: '400',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        enablejsapi: 1,
        loop: 1,
        playsinline: 1,
      }
    };
    
    const selectedSet = [
      'https://www.youtube.com/watch?v=f77SKdyn-1Y', // calm
      'https://www.youtube.com/watch?v=eKFTSSKCzWA',
      'https://www.youtube.com/watch?v=eMWeQWGla0Y',
      'https://www.youtube.com/watch?v=q6UB8sKMZrA',
      'https://www.youtube.com/watch?v=2NoE8WwiqJc',
    ];
    
    console.log(this.state)


    return (
      <div className="App">
        <div className="wrapper">
          { selectedSet.map((url, index) => {
            const videoId = youtubeParser(url);
            return (
              <Grid key={videoId} videoId={videoId} onAddGrid={this.onAddGrid}/>
            );
          })}
          { this.state.queuedVideoIds.map((_, index) => {
            return (
              <Grid key={index} onAddGrid={this.onAddGrid}/>
            );
          })}
        </div>    
      </div>
    );
  }
}

export default App;
