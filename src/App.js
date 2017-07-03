import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import Poster from './Poster';
import SearchBar from './SearchBar';

class App extends Component {
  constructor(props) {
    super(props);
    // In order to define a state variable, we put it in the constructor
    // We define it as an object on this.state
    // This replaces getInitialState()
    this.state = {
        moviePosters: []
    }
    this.handleSearch = this.handleSearch.bind(this) 
  }

  // componentDidMount runs AFTER the frist render
  componentDidMount() {
    console.log("I'm in the DOM");
    var url = 'http://api.themoviedb.org/3/movie/now_playing?api_key=fec8b5ab27b292a68294261bb21b04a5'
    $.getJSON(url, (movieData)=>{
      console.log(movieData);
      this.setState({
        moviePosters:movieData.results
      })
      // this.state.moviePosters = movieData.results == BAD!!!!!
    });
    console.log("Waiting on AJAX...")
  }
  handleSearch(value){
    // console.dir(value);
    var url = 'https://api.themoviedb.org/3/search/movie?api_key=fec8b5ab27b292a68294261bb21b04a5&query='+value
    $.getJSON(url, (movieData)=>{
      console.log(movieData);
      // Changing state will trigger a re-render (i.e., render will run again)
      this.setState({
        moviePosters:movieData.results
      })
      // NEVER EVER change state directly
      // this.state.moviePosters = movieData.resuls ---- BAD!!!!!
   });
  } 

  render() {
    var postersArray = [];

    this.state.moviePosters.map((poster,index)=>{
      // console.log(poster);
      postersArray.push(<Poster poster={poster} key={index} />)
      return

    });



    // After componentDidMount is finished changing state, postersArray looks like this....
    // postersArray = []
      // <Poster poster={poster} key={index} />
      // <Poster poster={poster} key={index} />
      // <Poster poster={poster} key={index} />

      


    return (
      <div className="App">
        
        <h1>The last movie app....(hopefully)</h1>
        <SearchBar searchFunction={this.handleSearch} />
        {postersArray}

      </div>
    );
  }
}

export default App;
