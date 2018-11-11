import React, { Component } from 'react';
import './App.css';
import Search from '../search/Search'
import ChooseType from '../type/ChooseType'
import data from '../../data/products.json'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchVal: '',
      results: [],
      types: [],
    }
  }

  componentDidMount() {
    this.getAvailableTypes()
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

  getAvailableTypes = () => {

  }

  render() {
    return (
      <div className="App">
        <div className="header">Search</div>
        <div className="app-container">
          <ChooseType types={this.state.types} />
          <Search handleChange={this.handleInputChange} results={this.state.results} />
        </div>
      </div>
    );
  }
}

export default App;
