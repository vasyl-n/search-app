import React, { Component } from 'react';
import './App.css';
import Search from '../search/Search'
import data from '../../data/products.json'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchVal: '',
      results: []
    }
  }

  handleInputChange = (e) => {
    this.setState({searchVal: e.target.value})
    this.search(e.target.value)
  }

  search = (val) => {
    var results = data.products
    val = val.toLowerCase()
    results = results.filter((el) => {
      return el.name.toLowerCase().indexOf(val) >= 0
    })
    this.setState({results})
  }

  render() {
    return (
      <div className="App">
        <Search handleChange={this.handleInputChange} results={this.state.results} />
      </div>
    );
  }
}

export default App;
