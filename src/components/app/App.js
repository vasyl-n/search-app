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
   
  }

  handleInputChange = (e) => {
    this.setState({searchVal: e.target.value})
    this.search(e.target.value)
  }

  search = (val) => {
    let results = data.products
    val = val.toLowerCase()
    results = results.filter((el) => {
      return el.name.toLowerCase().indexOf(val) >= 0
    })
    this.setState({results})
    this.getAvailableTypes(results)
  }

  getAvailableTypes = (results) => {
    let uniqueTypes = new Set()
    results.forEach((el) => {
      uniqueTypes.add(el.type)
    })
    let typesArray = Array.from(uniqueTypes)
    var typesResult = typesArray.reduce((acc, el) => {
      let newType = {
        name: el,
        checked: false
      }
      acc.push(newType)
      return acc
    }, [])
    this.setState({types: typesResult})
  }

  handleCheckboxChange = (indx) => {
    let types = this.state.types
    let type = types[indx]
    type.checked = !type.checked
    this.setState(types)
  } 

  render() {
    // console.log(this.state)
    return (
      <div className="App">
        <div className="header">Search</div>
        <div className="app-container">
          <Search handleChange={this.handleInputChange} results={this.state.results} />
          <ChooseType types={this.state.types} handleChange={this.handleCheckboxChange} />
        </div>
      </div>
    );
  }
}

export default App
