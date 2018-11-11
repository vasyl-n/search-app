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
      typesState: {},
    }
  }

  handleInputChange = (e) => {
    this.setState({searchVal: e.target.value})
    this.search(e.target.value)
  }

  search = (val) => {
    if ( !val ) {
      this.setState({types: [], results: []})
      return 
    }

    let results = data.products
    val = val.toLowerCase()

    const types = this.getAvailableTypes(results)
    const typesObj = this.makeTypesObject(types)
    results = results.filter((el) => {
      return el.name.toLowerCase().indexOf(val) >= 0 && typesObj[el.type] === true
    })
    this.setState({results, types})
  }

  getAvailableTypes = (results) => {
    if ( this.state.types.length > 0 ) {
      return this.state.types
    }
    let uniqueTypes = new Set()
    results.forEach((el) => {
      uniqueTypes.add(el.type)
    })
    let typesArray = Array.from(uniqueTypes)
    var typesResult = typesArray.reduce((acc, el) => {
      let newType = {
        name: el,
        checked: true,
      }
      acc.push(newType)
      return acc
    }, [])
    return typesResult
  }

  handleCheckboxChange = (indx) => {
    let types = this.state.types
    let type = types[indx]
    type.checked = !type.checked
    this.setState(types)
    this.search(this.state.searchVal)
  } 

  makeTypesObject = (types) => {
    var typesObj = types.reduce((acc, el) => {
      acc[el.name] = el.checked
      return acc
    }, {})
    return typesObj
  }

  handleClick = (val) => {
    this.setState({searchVal: val, types: [], results: []})
  }

  render() {
    return (
      <div className="App">
        <div className="header">Search</div>
        <div className="app-container">
          <Search handleClick={this.handleClick} value={this.state.searchVal} handleChange={this.handleInputChange} results={this.state.results} />
          <ChooseType types={this.state.types} handleChange={this.handleCheckboxChange} />
        </div>
      </div>
    );
  }
}

export default App
